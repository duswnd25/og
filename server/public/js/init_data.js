type = ['primary', 'info', 'success', 'warning', 'danger'];
const config = {
	gradientChartOptionsConfigurationWithTooltipBlue: {
		maintainAspectRatio: false,
		legend: {
			display: false
		},

		tooltips: {
			backgroundColor: '#f5f5f5',
			titleFontColor: '#333',
			bodyFontColor: '#666',
			bodySpacing: 4,
			xPadding: 12,
			mode: 'nearest',
			intersect: 0,
			position: 'nearest'
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.0)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						suggestedMin: 60,
						suggestedMax: 125,
						padding: 20,
						fontColor: '#2380f7'
					}
				}
			],

			xAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.1)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						padding: 20,
						fontColor: '#2380f7'
					}
				}
			]
		}
	},

	gradientChartOptionsConfigurationWithTooltipPurple: {
		maintainAspectRatio: false,
		legend: {
			display: false
		},

		tooltips: {
			backgroundColor: '#f5f5f5',
			titleFontColor: '#333',
			bodyFontColor: '#666',
			bodySpacing: 4,
			xPadding: 12,
			mode: 'nearest',
			intersect: 0,
			position: 'nearest'
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.0)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						suggestedMin: 60,
						suggestedMax: 125,
						padding: 20,
						fontColor: '#9a9a9a'
					}
				}
			],

			xAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(225,78,202,0.1)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						padding: 20,
						fontColor: '#9a9a9a'
					}
				}
			]
		}
	},

	gradientChartOptionsConfigurationWithTooltipOrange: {
		maintainAspectRatio: false,
		legend: {
			display: false
		},

		tooltips: {
			backgroundColor: '#f5f5f5',
			titleFontColor: '#333',
			bodyFontColor: '#666',
			bodySpacing: 4,
			xPadding: 12,
			mode: 'nearest',
			intersect: 0,
			position: 'nearest'
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.0)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						suggestedMin: 50,
						suggestedMax: 110,
						padding: 20,
						fontColor: '#ff8a76'
					}
				}
			],

			xAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(220,53,69,0.1)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						padding: 20,
						fontColor: '#ff8a76'
					}
				}
			]
		}
	},

	gradientChartOptionsConfigurationWithTooltipGreen: {
		maintainAspectRatio: false,
		legend: {
			display: false
		},

		tooltips: {
			backgroundColor: '#f5f5f5',
			titleFontColor: '#333',
			bodyFontColor: '#666',
			bodySpacing: 4,
			xPadding: 12,
			mode: 'nearest',
			intersect: 0,
			position: 'nearest'
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.0)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						suggestedMin: 50,
						suggestedMax: 125,
						padding: 20,
						fontColor: '#9e9e9e'
					}
				}
			],

			xAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: 'rgba(0,242,195,0.1)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						padding: 20,
						fontColor: '#9e9e9e'
					}
				}
			]
		}
	},

	gradientBarChartConfiguration: {
		maintainAspectRatio: false,
		legend: {
			display: false
		},

		tooltips: {
			backgroundColor: '#f5f5f5',
			titleFontColor: '#333',
			bodyFontColor: '#666',
			bodySpacing: 4,
			xPadding: 12,
			mode: 'nearest',
			intersect: 0,
			position: 'nearest'
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.1)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						suggestedMin: 60,
						suggestedMax: 120,
						padding: 20,
						fontColor: '#9e9e9e'
					}
				}
			],

			xAxes: [
				{
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.1)',
						zeroLineColor: 'transparent'
					},
					ticks: {
						padding: 20,
						fontColor: '#9e9e9e'
					}
				}
			]
		}
	}
};

const valueList = ['brightness-average-value', 'humidity-average-value', 'temperature-average-value'];

// ============================ 온도
const temperatureContext = document.getElementById('chartLinePurple').getContext('2d');
const temperatureStroke = temperatureContext.createLinearGradient(0, 230, 0, 50);

temperatureStroke.addColorStop(1, 'rgba(72,72,176,0.2)');
temperatureStroke.addColorStop(0.2, 'rgba(72,72,176,0.0)');
temperatureStroke.addColorStop(0, 'rgba(119,52,169,0)');

const temperatureConfig = {
	type: 'line',
	data: {
		labels: [],
		datasets: [
			{
				label: 'temperature',
				fill: true,
				backgroundColor: temperatureStroke,
				borderColor: '#d048b6',
				borderWidth: 2,
				borderDash: [],
				borderDashOffset: 0.0,
				pointBackgroundColor: '#d048b6',
				pointBorderColor: 'rgba(255,255,255,0)',
				pointHoverBackgroundColor: '#d048b6',
				pointBorderWidth: 20,
				pointHoverRadius: 4,
				pointHoverBorderWidth: 15,
				pointRadius: 4,
				data: []
			}
		]
	},

	options: config.gradientChartOptionsConfigurationWithTooltipPurple
};

let temperatureChart = null;

// ============================ 밝기
const brightnessContext = document.getElementById('brightness-chart').getContext('2d');

const brightnessStroke = brightnessContext.createLinearGradient(0, 230, 0, 50);

brightnessStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
brightnessStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); // green colors
brightnessStroke.addColorStop(0, 'rgba(66,134,121,0)'); // green colors

const brightnessConfig = {
	type: 'line',
	data: {
		labels: [],
		datasets: [
			{
				label: 'brightness',
				fill: true,
				backgroundColor: brightnessStroke,
				borderColor: '#00d6b4',
				borderWidth: 2,
				borderDash: [],
				borderDashOffset: 0.0,
				pointBackgroundColor: '#00d6b4',
				pointBorderColor: 'rgba(255,255,255,0)',
				pointHoverBackgroundColor: '#00d6b4',
				pointBorderWidth: 20,
				pointHoverRadius: 4,
				pointHoverBorderWidth: 15,
				pointRadius: 4,
				data: []
			}
		]
	},
	options: config.gradientChartOptionsConfigurationWithTooltipGreen
};

let brightnessChart = null;

// ============================ 습도
const humidityContext = document.getElementById('humidity-chart').getContext('2d');

const humidityGradient = humidityContext.createLinearGradient(0, 230, 0, 50);

humidityGradient.addColorStop(1, 'rgba(29,140,248,0.2)');
humidityGradient.addColorStop(0.4, 'rgba(29,140,248,0.0)');
humidityGradient.addColorStop(0, 'rgba(29,140,248,0)');

const humidityConfig = {
	type: 'line',
	responsive: true,
	legend: {
		display: false
	},
	data: {
		labels: [],
		datasets: [
			{
				label: 'humidity',
				fill: true,
				backgroundColor: humidityGradient,
				hoverBackgroundColor: humidityGradient,
				borderColor: '#1f8ef1',
				borderWidth: 2,
				borderDash: [],
				borderDashOffset: 0.0,
				data: []
			}
		]
	},
	options: config.gradientBarChartConfiguration
};

let humidityChart = null;

// ============================ 전체
const totalContext = document.getElementById('total-status-chart').getContext('2d');

const totalGradientStroke = totalContext.createLinearGradient(0, 230, 0, 50);

totalGradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
totalGradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
totalGradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); // purple colors

const totalChartConfig = {
	type: 'line',
	data: {
		labels: [],
		datasets: []
	},
	options: config.gradientChartOptionsConfigurationWithTooltipPurple
};

let totalChart = null;

chartData = {
	initData(input) {
		this.updateAverageValue(input.average.brightness, input.average.humidity, input.average.temperature);

		brightnessConfig.data.labels = input.chart.label;
		brightnessConfig.data.datasets[0].data = input.chart.brightness.value;
		brightnessConfig.options.scales.yAxes[0].ticks.suggestedMin = 0;
		brightnessConfig.options.scales.yAxes[0].ticks.suggestedMax = 1000;
		// brightnessConfig.options.scales.yAxes[0].ticks.min = 0;
		// brightnessConfig.options.scales.yAxes[0].ticks.max = 1000;
		brightnessChart = new Chart(brightnessContext, brightnessConfig);

		humidityConfig.data.labels = input.chart.label;
		humidityConfig.data.datasets[0].data = input.chart.humidity.value;
		humidityConfig.options.scales.yAxes[0].ticks.suggestedMin = 0;
		humidityConfig.options.scales.yAxes[0].ticks.suggestedMax = 100;
		humidityChart = new Chart(humidityContext, humidityConfig);

		temperatureConfig.data.labels = input.chart.label;
		temperatureConfig.data.datasets[0].data = input.chart.temperature.value;
		temperatureConfig.options.scales.yAxes[0].ticks.suggestedMin = 0;
		temperatureConfig.options.scales.yAxes[0].ticks.suggestedMax = 50;
		temperatureChart = new Chart(temperatureContext, temperatureConfig);

		this.updateTotalChart();
	},

	updateData(input) {
		brightnessConfig.data.labels = input.chart.label;
		brightnessConfig.data.datasets[0].data = input.chart.brightness.value;
		brightnessChart.update();

		humidityConfig.data.labels = input.chart.label;
		humidityConfig.data.datasets[0].data = input.chart.humidity.value;
		humidityChart.update();

		temperatureConfig.data.labels = input.chart.label;
		temperatureConfig.data.datasets[0].data = input.chart.temperature.value;
		temperatureChart.update();

		this.updateTotalChart();
	},

	updateAverageValue(brightness, humidity, temperature) {
		for (let index = 0; index < valueList.length; index += 1) {
			let text = '';
			switch (index) {
			case 0:
				text = `${parseInt(brightness, 10)} LUX`;
				break;
			case 1:
				text = `${parseInt(humidity, 10)} %`;
				break;
			case 2:
				text = `${parseInt(temperature, 10)} C`;
				break;
			}
			document.getElementById(valueList[index]).innerText = text;
		}
	},

	updateTotalChart() {
		// ============================ 전체
		totalChartConfig.data.labels = brightnessConfig.data.labels;
		totalChartConfig.data.datasets[0] = brightnessConfig.data.datasets[0];
		totalChartConfig.data.datasets[1] = humidityConfig.data.datasets[0];
		totalChartConfig.data.datasets[2] = temperatureConfig.data.datasets[0];

		if (totalChart === null) {
			totalChart = new Chart(totalContext, totalChartConfig);
		} else {
			totalChart.update();
		}
	}
};
