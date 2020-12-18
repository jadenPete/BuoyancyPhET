import Property from '../../../../axon/js/Property.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import BuoyancyUtils from '../../common/BuoyancyUtils.js';
import buoyancy from '../../buoyancy.js';

class Liquid {
	constructor() {
		this.levelProperty = new Property(BuoyancyConstants.LIQUID_LEVEL);
		this.densityProperty = new Property(BuoyancyConstants.LIQUID_DENSITY);
	}

	enableSubmersion(massObject, width) {
		massObject.positionProperty.link(position => {
			const submergedHeight = BuoyancyUtils.nearest_value(this.levelProperty.initialValue - (position.y - massObject.size), 0, massObject.size);
			const submergedArea = submergedHeight * massObject.size;

			this.levelProperty.set(this.levelProperty.initialValue + submergedArea / width);
		});
	}

	reset() {
		this.densityProperty.reset();
	}
}

buoyancy.register('Liquid', Liquid);
export default Liquid;
