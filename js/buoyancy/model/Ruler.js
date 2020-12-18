import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import buoyancy from '../../buoyancy.js';

class Ruler {
	constructor() {}

	setInitialX(x) {
		this.positionProperty = new Property(new Vector2(x, 0));
	}

	reset() {
		this.positionProperty.reset();
	}
}

buoyancy.register('Ruler', Ruler);
export default Ruler;
