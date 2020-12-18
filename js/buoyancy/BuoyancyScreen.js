// Copyright 2020, University of Colorado Boulder

/**
 * @author Jaden Peterson
 */

import Screen from '../../../joist/js/Screen.js';
import BuoyancyColors from '../common/BuoyancyColors.js';
import buoyancy from '../buoyancy.js';
import BuoyancyModel from './model/BuoyancyModel.js';
import BuoyancyScreenView from './view/BuoyancyScreenView.js';

class BuoyancyScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      //TODO if you include homeScreenIcon or navigationBarIcon, use JOIST/ScreenIcon
      backgroundColorProperty: BuoyancyColors.SCREEN_VIEW_BACKGROUND,
      tandem: tandem
    };

    super(
      () => new BuoyancyModel( tandem.createTandem( 'model' ) ),
      model => new BuoyancyScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

buoyancy.register( 'BuoyancyScreen', BuoyancyScreen );
export default BuoyancyScreen;