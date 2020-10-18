import React from 'react';

import {Line} from 'react-chartjs-2';



const LineChart = (labels, datasets, options) => {
	const data = {
		labels: labels,
		datasets: datasets
	}

	return <Line data={data} options={options}/>
}



export default LineChart;


