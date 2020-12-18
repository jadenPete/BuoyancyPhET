// Copyright 2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jaden Peterson
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import BuoyancyScreen from './buoyancy/BuoyancyScreen.js';
import buoyancyStrings from './buoyancyStrings.js';

const buoyancyTitleString = buoyancyStrings[ 'buoyancy' ].title;

const simOptions = {

  //TODO fill in credits, all of these fields are optional, see joist.CreditsNode
  credits: {
    leadDesign: '',
    softwareDevelopment: '',
    team: '',
    qualityAssurance: '',
    graphicArts: '',
    soundDesign: '',
    thanks: ''
  }
};

// launch the sim - beware that scenery Image nodes created outside of simLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
simLauncher.launch( () => {
  const sim = new Sim( buoyancyTitleString, [
    new BuoyancyScreen( Tandem.ROOT.createTandem( 'buoyancyScreen' ) )
  ], simOptions );
  sim.start();
} );