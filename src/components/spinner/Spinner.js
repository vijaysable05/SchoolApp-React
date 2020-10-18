import React from 'react';

import {SpinnerOverlay, SpinnerContainer} from './SpinnerStyles.js';

const Spinner = () => {
	return  (
			<SpinnerOverlay>
				<SpinnerContainer />
			</SpinnerOverlay>
		)
}

export default Spinner;