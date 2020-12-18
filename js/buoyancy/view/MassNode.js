import Property from '../../../../axon/js/Property.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import BuoyancyColors from '../../common/BuoyancyColors.js';
import buoyancy from '../../buoyancy.js';

class MassNode extends Node {
	constructor(mass, modelViewTransform) {
		super({
			cursor: "pointer"
		});

		this.addChild(new Rectangle(0, 0,
			modelViewTransform.modelToViewDeltaX(mass.size),
			-modelViewTransform.modelToViewDeltaY(mass.size), { // modelToViewDeltaY is negative
				fill: BuoyancyColors.MASS_COLOR
			}));

		this.addInputListener(new DragListener({
			positionProperty: mass.positionProperty,
			start: () => mass.gravityEnabledProperty.set(false),
			end: () => mass.gravityEnabledProperty.set(true),
			transform: modelViewTransform,
			dragBoundsProperty: new Property(mass.positionBounds)
		}));

		mass.positionProperty.link(position => this.translation = modelViewTransform.modelToViewPosition(position));
	}
}

buoyancy.register('MassNode', MassNode);
export default MassNode;
