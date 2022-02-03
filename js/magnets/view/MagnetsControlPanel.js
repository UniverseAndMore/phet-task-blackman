// Copyright 2013-2021, University of Colorado Boulder

/**
 * MagnetsControlPanel is a panel that contains controls for magnets.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
 */

import merge from "../../../../phet-core/js/merge.js";
import PhetFont from "../../../../scenery-phet/js/PhetFont.js";
import { Text } from "../../../../scenery/js/imports.js";
import { VBox } from "../../../../scenery/js/imports.js";
import RectangularPushButton from "../../../../sun/js/buttons/RectangularPushButton.js";
import Panel from "../../../../sun/js/Panel.js";
import exampleSim from "../../exampleSim.js";
import exampleSimStrings from "../../exampleSimStrings.js";
import ExampleSimConstants from "../../common/ExampleSimConstants.js";
import Vector2 from "../../../../dot/js/Vector2.js";

class MagnetsControlPanel extends Panel {
  /**
   * @param {MagnetsModel} model - the model for the entire screen
   * @param {Bounds2} layoutBounds - the layout bounds of the view
   * @param {(BarMagnet)=>void} createBarMagnetNode - callback in view to create bar magnet node and add it to the view
   * @param {Object} [options] - options for the control panel, see Panel.js for options
   */
  constructor(model, layoutBounds, createBarMagnetNode, options) {
    // Demonstrate a common pattern for specifying options and providing default values
    options = merge(
      {
        // Panel options
        xMargin: 10,
        yMargin: 10,
        stroke: "orange",
        lineWidth: 3,
      },
      options
    );

    // randomized position within the view coordinates
    const randomPosition = () => {
      return new Vector2(
        layoutBounds.width * (Math.random() - 0.5),
        layoutBounds.height * (Math.random() - 0.5)
      );
    };

    // 'Magnet Controls' title
    const magnetControlsTitleNode = new Text(exampleSimStrings.magnetControls, {
      font: new PhetFont({
        size: 18,
        weight: "bold",
      }),
    });

    // 'Flip Polarity' button
    const flipPolarityButton = new RectangularPushButton({
      content: new Text(exampleSimStrings.flipPolarity, {
        font: new PhetFont(ExampleSimConstants.CONTROL_BUTTON_FONT_SIZE),
      }),
      baseColor: ExampleSimConstants.CONTROL_BUTTON_COLOR,
      xMargin: ExampleSimConstants.CONTROL_BUTTON_MARGIN_X,
      listener: () => {
        const orientation = model.barMagnet.orientationProperty.get() + Math.PI;
        model.barMagnet.orientationProperty.set(orientation);
      },
    });

    // 'Move Magnet' button
    const moveMagnetButton = new RectangularPushButton({
      content: new Text(exampleSimStrings.moveMagnet, {
        font: new PhetFont(ExampleSimConstants.CONTROL_BUTTON_FONT_SIZE),
      }),
      baseColor: ExampleSimConstants.CONTROL_BUTTON_COLOR,
      xMargin: ExampleSimConstants.CONTROL_BUTTON_MARGIN_X,
      listener: () => {
        model.barMagnet.positionProperty.set(randomPosition());
      },
    });

    // 'Add Magnet' button
    const addMagnetButton = new RectangularPushButton({
      content: new Text(exampleSimStrings.addMagnet, {
        font: new PhetFont(ExampleSimConstants.CONTROL_BUTTON_FONT_SIZE),
      }),
      baseColor: ExampleSimConstants.CONTROL_BUTTON_COLOR,
      xMargin: ExampleSimConstants.CONTROL_BUTTON_MARGIN_X,
      listener: () => {
        const newBarMagnet = model.addNewMagnetAtPosition(randomPosition());
        createBarMagnetNode(newBarMagnet);
      },
    });

    // The contents of the control panel
    const content = new VBox({
      align: "center",
      spacing: 10,
      children: [
        magnetControlsTitleNode,
        flipPolarityButton,
        moveMagnetButton,
        addMagnetButton,
      ],
    });

    super(content, options);
  }
}

exampleSim.register("MagnetsControlPanel", MagnetsControlPanel);
export default MagnetsControlPanel;
