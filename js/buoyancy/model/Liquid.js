import Property from '../../../../axon/js/Property.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import BuoyancyUtils from '../../common/BuoyancyUtils.js';
import buoyancy from '../../buoyancy.js';

class Liquid {
	constructor() {
		this.levelProperty = new Property(BuoyancyConstants.LIQUID_LEVEL);
		this.densityProperty = new Property(BuoyancyConstants.LIQUID_DENSITY);
	}

	_getLevelIncrease(massPosition, massSize) {
		return BuoyancyUtils.nearest_value(this.levelProperty.initialValue - (massPosition.y - massSize), 0, massSize) * massSize / this.width;
	}

	enableSubmersion(masses, width) {
		this.width = width;

		// Set the initial level
		this.levelProperty.set(masses.reduce((sum, mass) => {
			return sum + this._getLevelIncrease(mass.positionProperty.value, mass.size);
		}, this.levelProperty.value));		

		// Adjust the level for a change in each mass's position
		masses.forEach(mass => mass.positionProperty.lazyLink((oldPosition, newPosition) => {
			this.levelProperty.set(this.levelProperty.value -
				this._getLevelIncrease(oldPosition, mass.size) +
				this._getLevelIncrease(newPosition, mass.size));
		}));
	}

	reset() {
		this.densityProperty.reset();
	}
}

buoyancy.register('Liquid', Liquid);
export default Liquid;
