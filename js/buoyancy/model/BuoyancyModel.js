// Copyright 2020, University of Colorado Boulder

/**
 * @author Jaden Peterson
 */

import Tandem from '../../../../tandem/js/Tandem.js';
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

		this.mass = new Mass();
		this.liquid = new Liquid();
		this.ruler = new Ruler();
	}

	/**
	 * Resets the model.
	 * @public
	 */
	reset() {
		this.liquid.reset();
		this.mass.reset();
		this.ruler.reset();
	}

	/**
	 * Steps the model.
	 * @param {number} dt - time step, in seconds
	 * @public
	 */
	step(dt) {
		this.mass.step(dt);
	}
}

buoyancy.register( 'BuoyancyModel', BuoyancyModel );
export default BuoyancyModel;
