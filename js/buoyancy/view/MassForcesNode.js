import Vector2 from '../../../../dot/js/Vector2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import BuoyancyColors from '../../common/BuoyancyColors.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import buoyancy from '../../buoyancy.js';

class MassForcesNode extends Node {
	constructor(mass, modelViewTransform) {
		super();

		this.mass = mass;
		this.modelViewTransform = modelViewTransform;

		this.buoyancyArrow = new ArrowNode();
		this.buoyancyArrow.fill = this.buoyancyArrow.stroke = BuoyancyColors.BUOYANCY_FORCE_COLOR;

		this.gravityArrow = new ArrowNode();
		this.gravityArrow.fill = this.gravityArrow.stroke = BuoyancyColors.GRAVITY_FORCE_COLOR;

		this.addChild(this.buoyancyArrow);
		this.addChild(this.gravityArrow);

		mass.positionProperty.link(_ => {
			this._updateBuoyancyArrow();
			this._updateGravityArrow();
		});

		mass.buoyancyForceProperty.lazyLink(_ => this._updateBuoyancyArrow());
		mass.gravityForceProperty.lazyLink(_ => this._updateGravityArrow());
	}

	_getArrowTailPosition() {
		return new Vector2(
			this.modelViewTransform.modelToViewX(this.mass.positionProperty.value.x + this.mass.size / 2),
			this.modelViewTransform.modelToViewY(this.mass.positionProperty.value.y - this.mass.size / 2));
	}

	_updateBuoyancyArrow() {
		const tailPosition = this._getArrowTailPosition();

		this.buoyancyArrow.setTailAndTip(
			tailPosition.x, tailPosition.y,
			tailPosition.x, tailPosition.y - this.mass.buoyancyForceProperty.value * BuoyancyConstants.FORCE_SCALE);
	}

	_updateGravityArrow() {
		const tailPosition = this._getArrowTailPosition();

		this.gravityArrow.setTailAndTip(
			tailPosition.x, tailPosition.y,
			tailPosition.x, tailPosition.y - this.mass.gravityForceProperty.value * BuoyancyConstants.FORCE_SCALE);
	}
}

buoyancy.register('MassForcesNode', MassForcesNode);
export default MassForcesNode;