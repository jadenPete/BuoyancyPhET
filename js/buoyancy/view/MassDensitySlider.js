import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Slider from '../../../../sun/js/Slider.js';
import BuoyancyConstants from '../../common/BuoyancyConstants.js';
import buoyancy from '../../buoyancy.js';

class MassDensitySlider extends Slider {
	constructor(densityProperty) {
		super(densityProperty, new Range(750, 2700), {
			orientation: Orientation.VERTICAL,
			trackSize: new Dimension2(BuoyancyConstants.SLIDER_HEIGHT, 5)
		});

		this.addMinorTick(750, new Text("Oak"));
		this.addMinorTick(920, new Text("Ice"));
		this.addMinorTick(2000, new Text("Brick"));
		this.addMinorTick(2700, new Text("Aluminum"));

		this.x = BuoyancyConstants.RULER_WIDTH + 170;
		this.y = BuoyancyConstants.SLIDER_HEIGHT + 20;
	}
}

buoyancy.register('MassDensitySlider', MassDensitySlider);
export default MassDensitySlider;
