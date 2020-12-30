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

	// Physics engine
	FPS: 60,
	GRAVITATIONAL_ACCELERATION: 9.80665,

	// Liquid
	LIQUID_LEVEL: 3,
	LIQUID_DENSITY: 997, // water

	// Sliders (x and y relative to RULER_WIDTH and SLIDER_HEIGHT respectively)
	LIQUID_DENSITY_SLIDER_POSITION: new Vector2(75, 20),
	MASS1_DENSITY_SLIDER_POSITION: new Vector2(170, 20),
	MASS2_DENSITY_SLIDER_POSITION: new Vector2(265, 20),
	SLIDER_HEIGHT: 250,

	// Masses
	MASS1_POSITION: new Vector2(-1, 1),
	MASS2_POSITION: new Vector2(1, 1),

	MASS1_SIZE: 1,
	MASS2_SIZE: 1,

	MASS1_DENSITY: 920, // ice
	MASS2_DENSITY: 2000, // brick

	// Mass Forces
	FORCE_SCALE: 0.0075,

	// Ruler
	RULER_WIDTH: 50,
};

buoyancy.register('BuoyancyConstants', BuoyancyConstants);
export default BuoyancyConstants;
