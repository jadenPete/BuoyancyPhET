import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Slider from '../../../../sun/js/Slider.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import buoyancy from '../../buoyancy.js';

class LiquidDensitySlider extends Slider {
	constructor(densityProperty) {
		super(densityProperty, new Range(0, 1450.0), {
			orientation: Orientation.VERTICAL,
			trackSize: new Dimension2(BuoyancyConstants.SLIDER_HEIGHT, 5)
		});

		this.addMinorTick(1.225, new Text("Air"));
		this.addMinorTick(800, new Text("Gasoline"));
		this.addMinorTick(917, new Text("Olive Oil"));
		this.addMinorTick(997, new Text("Water"));
		this.addMinorTick(1450, new Text("Honey"));

		this.x = BuoyancyConstants.RULER_WIDTH + 75;
		this.y = BuoyancyConstants.SLIDER_HEIGHT + 20;
	}
}

buoyancy.register('LiquidDensitySlider', LiquidDensitySlider);
export default LiquidDensitySlider;
