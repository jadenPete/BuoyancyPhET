import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import RulerNode from '../../../../scenery-phet/js/RulerNode.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import buoyancy from '../../buoyancy.js';

class BuoyancyRulerNode extends RulerNode {
	constructor(ruler, layoutBounds, modelViewTransform) {
		const majorTickWidth = -modelViewTransform.modelToViewDeltaY(1); // modelToViewDeltaY is negative
		const majorTickLabels = new Array(Math.floor(layoutBounds.height / majorTickWidth) + 1);

		for (let i = 0; i < majorTickLabels.length; i++) {
			majorTickLabels[i] = i;
		}

		super(layoutBounds.height, BuoyancyConstants.RULER_WIDTH, majorTickWidth, majorTickLabels, "meters", {
			cursor: "pointer",
			insetsWidth: 0,
			minorTicksPerMajorTick: 1
		});

		this.rotate(3 / 2 * Math.PI);

		ruler.positionProperty.link(position => this.translation = modelViewTransform.modelToViewPosition(position));

		this.addInputListener(new DragListener({
			positionProperty: ruler.positionProperty,
			transform: modelViewTransform,
			dragBoundsProperty: new Property(new Bounds2(
				modelViewTransform.viewToModelX(layoutBounds.minX), 0,
				modelViewTransform.viewToModelX(layoutBounds.maxX - BuoyancyConstants.RULER_WIDTH), 0))
		}));
	}
}

buoyancy.register('BuoyancyRulerNode', BuoyancyRulerNode);
export default BuoyancyRulerNode;
