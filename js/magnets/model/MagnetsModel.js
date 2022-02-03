// Copyright 2013-2021, University of Colorado Boulder

/**
 * MagnetsModel is the top-level model for the 'Magnets' screen. You can think of the top-level model as a container
 * for all of the pieces that make up the model for a screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
 */

import Dimension2 from "../../../../dot/js/Dimension2.js";
import Vector2 from "../../../../dot/js/Vector2.js";
import exampleSim from "../../exampleSim.js";
import BarMagnet from "./BarMagnet.js";
import ExampleSimConstants from "../../common/ExampleSimConstants.js";

class MagnetsModel {
  //the array of bar magnets added from the control panel
  addedBarMagnets = [];

  constructor() {
    // @public {BarMagnet} initial bar magnet model element
    this.barMagnet = new BarMagnet(
      new Dimension2(
        ExampleSimConstants.BAR_MAGNET_WIDTH,
        ExampleSimConstants.BAR_MAGNET_HEIGHT
      ),
      new Vector2(0, 0),
      0
    );
  }

  /**
   * Add a new bar magnet to the model at the specified position
   * @public
   * @param {Vector2} position - position to add the bar magnet to the view
   * @returns {BarMagnet} - the bar magnet added to the model
   */
  addNewMagnetAtPosition(position) {
    const newBarMagnet = new BarMagnet(
      new Dimension2(
        ExampleSimConstants.BAR_MAGNET_WIDTH,
        ExampleSimConstants.BAR_MAGNET_HEIGHT
      ),
      position,
      0
    );
    this.addedBarMagnets.push(newBarMagnet);
    return newBarMagnet;
  }

  /**
   * Restores the initial state of all model elements.
   * This method is called when the simulation's "Reset All" button is pressed.
   * @public
   */
  reset() {
    this.barMagnet.reset();
    this.addedBarMagnets.length = 0; //reset the array
  }
}

exampleSim.register("MagnetsModel", MagnetsModel);
export default MagnetsModel;
