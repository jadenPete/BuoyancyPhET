// Copyright 2020, University of Colorado Boulder

/**
 * @author Jaden Peterson
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import buoyancy from '../../buoyancy.js';
import Liquid from './Liquid.js';
import Mass from './Mass.js';
import Ruler from './Ruler.js';

class BuoyancyModel {
	/**
	 * @param {Tandem} tandem
	 */
	constructor(tandem) {
		assert && assert(tandem instanceof Tandem, 'invalid tandem');

		this.masses = [
			new Mass(BuoyancyConstants.MASS1_POSITION, BuoyancyConstants.MASS1_SIZE, BuoyancyConstants.MASS1_DENSITY),
			new Mass(BuoyancyConstants.MASS2_POSITION, BuoyancyConstants.MASS2_SIZE, BuoyancyConstants.MASS1_DENSITY)
		];

		this.liquid = new Liquid();
		this.ruler = new Ruler();
	}

	/**
	 * Resets the model.
	 * @public
	 */
	reset() {
		this.liquid.reset();
		this.masses.forEach(mass => mass.reset());
		this.ruler.reset();
	}

	/**
	 * Steps the model.
	 * @param {number} dt - time step, in seconds
	 * @public
	 */
	step(dt) {
		this.masses.forEach(mass => mass.step(dt));
	}
}

buoyancy.register('BuoyancyModel', BuoyancyModel);
export default BuoyancyModel;
