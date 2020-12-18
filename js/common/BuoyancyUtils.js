import buoyancy from '../buoyancy.js';

class BuoyancyUtils {
	static nearest_value(x, min, max) {
		if (x < min) {
			return min;
		}

		if (x > max) {
			return max
		}

		return x;
	}
}

buoyancy.register('BuoyancyUtils', BuoyancyUtils);
export default BuoyancyUtils;
