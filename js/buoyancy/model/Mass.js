import Property from '../../../../axon/js/Property.js';
import EventTimer from '../../../../phet-core/js/EventTimer.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import BuoyancyUtils from '../../common/BuoyancyUtils.js';
import buoyancy from '../../buoyancy.js';

class Mass {
	constructor(position, size, density) {
		this.positionProperty = new Property(position);
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

				this.velocityProperty.set(this.positionBounds.containsPoint(newPosition) ? newVelocity : 0);
				this.positionProperty.set(this.positionBounds.closestPointTo(newPosition));
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
