// Copyright 2020, University of Colorado Boulder

/**
 * @author Jaden Peterson
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import buoyancy from '../../buoyancy.js';
import BuoyancyModel from '../model/BuoyancyModel.js';
import BuoyancyRulerNode from './BuoyancyRulerNode.js';
import LiquidDensitySlider from './LiquidDensitySlider.js';
import LiquidNode from './LiquidNode.js';
import MassDensitySlider from './MassDensitySlider.js';
import MassForcesNode from './MassForcesNode.js';
import MassNode from './MassNode.js';

class BuoyancyScreenView extends ScreenView {
	/**
	 * @param {BuoyancyModel} model
	 * @param {Tandem} tandem
	 */
	constructor(model, tandem) {
		assert && assert(model instanceof BuoyancyModel, 'invalid model' );
		assert && assert(tandem instanceof Tandem, 'invalid tandem' );

		super({
			tandem: tandem
		});

		this.model = model;

		const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping(
			new Vector2(this.layoutBounds.width / 2, this.layoutBounds.height), 100, -100);

		// Liquid
		model.liquid.enableSubmersion(model.masses, modelViewTransform.viewToModelDeltaX(this.layoutBounds.width));

		this.addChild(new LiquidNode(model.liquid, modelViewTransform, this.layoutBounds));

		// Density Sliders
		this.addChild(new LiquidDensitySlider(BuoyancyConstants.LIQUID_DENSITY_SLIDER_POSITION, model.liquid.densityProperty));
		this.addChild(new MassDensitySlider(BuoyancyConstants.MASS1_DENSITY_SLIDER_POSITION, model.masses[0].densityProperty));
		this.addChild(new MassDensitySlider(BuoyancyConstants.MASS2_DENSITY_SLIDER_POSITION, model.masses[1].densityProperty));

		// Masses
		model.masses.forEach(mass => {
			mass.initializeGravity(modelViewTransform.viewToModelBounds(new Bounds2(
				0,
				0,
				this.layoutBounds.maxX - modelViewTransform.modelToViewDeltaX(mass.size),
				this.layoutBounds.maxY + modelViewTransform.modelToViewDeltaY(mass.size))), model.liquid); // modelToViewDeltaY is negative

			this.addChild(new MassNode(mass, modelViewTransform));
			this.addChild(new MassForcesNode(mass, modelViewTransform));
		});

		// Ruler
		model.ruler.setInitialX(modelViewTransform.viewToModelX(this.layoutBounds.minX));

		this.addChild(new BuoyancyRulerNode(model.ruler, this.layoutBounds, modelViewTransform));

		// Reset All Button
		this.addChild(new ResetAllButton({
			listener: () => {
				this.interruptSubtreeInput(); // cancel interactions that may be in progress
				this.reset();
			},

			right: this.layoutBounds.maxX - BuoyancyConstants.SCREEN_VIEW_X_MARGIN,
			bottom: this.layoutBounds.maxY - BuoyancyConstants.SCREEN_VIEW_Y_MARGIN,
			tandem: tandem.createTandem('resetAllButton')
		}));
	}

	/**
	 * Resets the view.
	 * @public
	 */
	reset() {
		this.model.reset();
	}

	/**
	 * Steps the view.
	 * @param {number} dt - time step, in seconds
	 * @public
	 */
	step(dt) {
		this.model.step(dt);
	}
}

buoyancy.register('BuoyancyScreenView', BuoyancyScreenView);
export default BuoyancyScreenView;
