// Copyright 2021, University of Colorado Boulder

/**
 * MagnetsScreenView is the top-level view component for the 'Magnets' screen. All of the components that make up
 * the screen's view are added here.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
 */

import Vector2 from "../../../../dot/js/Vector2.js";
import ScreenView from "../../../../joist/js/ScreenView.js";
import ModelViewTransform2 from "../../../../phetcommon/js/view/ModelViewTransform2.js";
import ResetAllButton from "../../../../scenery-phet/js/buttons/ResetAllButton.js";
import ExampleSimConstants from "../../common/ExampleSimConstants.js";
import exampleSim from "../../exampleSim.js";
import BarMagnetNode from "./BarMagnetNode.js";
import MagnetsControlPanel from "./MagnetsControlPanel.js";

class MagnetsScreenView extends ScreenView {
  //the array of bar magnet nodes added from the control panel
  addedBarMagnetNodes = [];

  /**
   * @param {MagnetsModel} model - the top-level model for this screen
   */
  constructor(model) {
    super();

    // transform between model coordinates and view coordinates
    const center = new Vector2(
      this.layoutBounds.width / 2,
      this.layoutBounds.height / 2
    );
    this.modelViewTransform = ModelViewTransform2.createOffsetScaleMapping(
      center,
      1
    );

    this.createBarMagnetNode = this.createBarMagnetNode.bind(this);

    // Add a magnet. The model determines its position.
    this.addChild(new BarMagnetNode(model.barMagnet, this.modelViewTransform));

    // Add the control panel for magnets, positioned at the top-right of the screen.
    this.addChild(
      new MagnetsControlPanel(
        model,
        this.currentBounds,
        this.createBarMagnetNode,
        {
          right:
            this.layoutBounds.right - ExampleSimConstants.SCREEN_VIEW_X_MARGIN,
          top: this.layoutBounds.top + ExampleSimConstants.SCREEN_VIEW_Y_MARGIN,
        }
      )
    );

    // Add the 'Reset All' button. This resets the simulation to its initial state. By PhET convention, this
    // button is positioned at the lower-right of the screen.
    this.addChild(
      new ResetAllButton({
        listener: () => {
          // Interrupt any other user interactions that may be in progress, needed for multi-touch.
          // To demonstrate, press the Reset All button while dragging the magent.
          this.interruptSubtreeInput();

          // Remove all added bar magnets
          this.addedBarMagnetNodes.forEach((barMagnet) =>
            this.removeChild(barMagnet)
          );
          //reset the added bar magnets array
          this.addedBarMagnetNodes.length = 0;

          // Reset the model
          model.reset();
        },
        right:
          this.layoutBounds.right - ExampleSimConstants.SCREEN_VIEW_X_MARGIN,
        bottom:
          this.layoutBounds.bottom - ExampleSimConstants.SCREEN_VIEW_Y_MARGIN,
      })
    );
  }

  /**
   * create a bar magnet node and add it to the view
   * @param {BarMagnet} barMagnet - the bar magnet object from the model
   */
  createBarMagnetNode(barMagnet) {
    const newMagnet = new BarMagnetNode(barMagnet, this.modelViewTransform);
    this.addChild(newMagnet);
    this.addedBarMagnetNodes.push(newMagnet);
    this.moveChildBackward(newMagnet); //move the new bar magnet behind the control panel
    this.moveChildBackward(newMagnet); //move the new bar magnet behind the reset button
  }

  /**
   * accessor to layout bounds reference
   * @returns {Bounds2} - the current layout bounds
   */
  get currentBounds() {
    return this.layoutBounds;
  }
}

exampleSim.register("MagnetsScreenView", MagnetsScreenView);
export default MagnetsScreenView;
