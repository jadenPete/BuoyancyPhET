import Property from '../../../../axon/js/Property.js';
import EventTimer from '../../../../phet-core/js/EventTimer.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import BuoyancyUtils from '../../common/BuoyancyUtils.js';
import buoyancy from '../../buoyancy.js';

class MassPositionProperty extends Property {
	enableCollisionDetection(mass, other_masses) {
		this.set = newPosition => {
			const collidingMass = other_masses.find(other_mass => {
				return other_mass !== mass &&
					newPosition.x + mass.size > other_mass.positionProperty.value.x &&
					newPosition.x < other_mass.positionProperty.value.x + other_mass.size &&
					newPosition.y > other_mass.positionProperty.value.y - other_mass.size &&
					newPosition.y - mass.size < other_mass.positionProperty.value.y;
			});

			if (collidingMass === undefined) {
				super.set(newPosition);
			} else {
				super.set(newPosition.plusXY(...[
					[collidingMass.positionProperty.value.x + collidingMass.size - newPosition.x, 0],
					[collidingMass.positionProperty.value.x - mass.size - newPosition.x, 0],
					[0, collidingMass.positionProperty.value.y + collidingMass.size - newPosition.y],
					[0, collidingMass.positionProperty.value.y - mass.size - newPosition.y]
				].reduce((min, current) => Math.abs(current[0]) + Math.abs(current[1]) < Math.abs(min[0]) + Math.abs(min[1]) ? current : min)));

				mass.velocityProperty.set(collidingMass.velocityProperty.value);
			}
		};
	}
}

class Mass {
	constructor(position, size, density) {
		this.positionProperty = new MassPositionProperty(position);
		this.velocityProperty = new Property(0);

		this.size = size;
		this.densityProperty = new Property(density);
		this.densityProperty.lazyLink(_ => this._updateGravityForce());

		this.buoyancyForceProperty = new Property(0);
		this.gravityForceProperty = new Property(0);
		this.gravityEnabledProperty = new Property(false);
		this.gravityEnabledProperty.lazyLink(_ => this._updateGravityForce());
	}

	_getAreaSubmerged(liquid) {
		return BuoyancyUtils.nearest_value(liquid.levelProperty.value - (this.positionProperty.value.y - this.size), 0, this.size) * this.size;
	}

	_getMass() {
		return this.densityProperty.value * this.size * this.size;
	}

	_updateGravityForce() {
		this.gravityForceProperty.set(this.gravityEnabledProperty.value ? (this._getMass() * -BuoyancyConstants.GRAVITATIONAL_ACCELERATION) : 0);
	}

	initializeGravity(positionBounds, liquid) {
		this.gravityEnabledProperty.set(true);
		this.positionBounds = positionBounds;

		this.eventTimer = new EventTimer(new EventTimer.ConstantEventModel(BuoyancyConstants.FPS), dt => {
			if (this.gravityEnabledProperty.value) {
				this.buoyancyForceProperty.set(liquid.densityProperty.value * this._getAreaSubmerged(liquid) * BuoyancyConstants.GRAVITATIONAL_ACCELERATION);

				const acceleration = (this.buoyancyForceProperty.value + this.gravityForceProperty.value) / this._getMass();
				const newVelocity = this.velocityProperty.value + acceleration * (1 / BuoyancyConstants.FPS + dt);
				const newPosition = this.positionProperty.value.plusXY(0, newVelocity * (1 / BuoyancyConstants.FPS + dt));

				this.positionProperty.set(this.positionBounds.closestPointTo(newPosition));
				this.velocityProperty.set(this.positionProperty.equalsValue(newPosition) ? newVelocity : 0);
			} else {
				this.buoyancyForceProperty.set(0);
			}
		});
	}

	reset() {
		this.positionProperty.reset();
		this.velocityProperty.reset();
		this.densityProperty.reset();
	}

	step(dt) {
		this.eventTimer.step(dt);
	}
}

buoyancy.register('Mass', Mass);
export default Mass;
