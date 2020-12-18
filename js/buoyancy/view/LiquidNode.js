import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import BuoyancyColors from '../../common/BuoyancyColors.js';
import buoyancy from '../../buoyancy.js';

class LiquidNode extends Node {
	constructor(liquid, modelViewTransform, layoutBounds) {
		super();

		this.addChild(new Rectangle({
			fill: BuoyancyColors.LIQUID_COLOR,
			rectX: layoutBounds.minX,
			rectWidth: layoutBounds.width
		}));

		liquid.levelProperty.link(level => {
			// modelToViewDeltaY is negative
			this.children[0].rectY = modelViewTransform.modelToViewY(level);
			this.children[0].rectHeight = layoutBounds.maxY - this.children[0].rectY;
		});
	}
}

buoyancy.register('LiquidNode', LiquidNode);
export default LiquidNode;
