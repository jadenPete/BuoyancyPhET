// Copyright 2020, University of Colorado Boulder

/**
 * Colors used throughout this simulation.
 *
 * @author Jaden Peterson
 */

import Property from '../../../axon/js/Property.js';
import buoyancy from '../buoyancy.js';

const BuoyancyColors = {
	SCREEN_VIEW_BACKGROUND: new Property('skyblue'),

	LIQUID_COLOR: "royalblue",
	BUOYANCY_FORCE_COLOR: "blue",
	GRAVITY_FORCE_COLOR: "#900",
	MASS_COLOR: "black"
};

buoyancy.register('BuoyancyColors', BuoyancyColors);
export default BuoyancyColors;
