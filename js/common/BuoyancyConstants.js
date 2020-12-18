// Copyright 2020, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Jaden Peterson
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import buoyancy from '../buoyancy.js';

const BuoyancyConstants = {
	SCREEN_VIEW_X_MARGIN: 15,
	SCREEN_VIEW_Y_MARGIN: 15,

	// Liquid
	LIQUID_LEVEL: 3,
	LIQUID_DENSITY: 997, // water

	// Sliders
	SLIDER_HEIGHT: 250,

	// Mass
	FPS: 60,
	GRAVITATIONAL_ACCELERATION: 9.80665,
	MASS_POSITION: new Vector2(0, 1),
	MASS_SIZE: 1,
	MASS_DENSITY: 920, // ice

	// Mass Forces
	FORCE_SCALE: 0.0075,

	// Ruler
	RULER_WIDTH: 50,
};

buoyancy.register('BuoyancyConstants', BuoyancyConstants);
export default BuoyancyConstants;
