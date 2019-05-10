type = ['primary', 'info', 'success', 'warning', 'danger'];

initData = {
	initDashboardPageCharts() {
		gradientChartOptionsConfigurationWithTooltipBlue = {
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
		};

		gradientChartOptionsConfigurationWithTooltipPurple = {
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
		};

		gradientChartOptionsConfigurationWithTooltipOrange = {
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
		};

		gradientChartOptionsConfigurationWithTooltipGreen = {
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
		};

		gradientBarChartConfiguration = {
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
		};

		// 온도
		{
			const temperatureAverageValue = '999';
			const temperatureData = {
				value: [0, 10, 20, 30, 40, 50],
				label: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
			};

			const temperatureContext = document
				.getElementById('chartLinePurple')
				.getContext('2d');
			const temperatureStroke = temperatureContext.createLinearGradient(
				0,
				230,
				0,
				50
			);

			temperatureStroke.addColorStop(1, 'rgba(72,72,176,0.2)');
			temperatureStroke.addColorStop(0.2, 'rgba(72,72,176,0.0)');
			temperatureStroke.addColorStop(0, 'rgba(119,52,169,0)'); // purple colors

			const temperatureConfig = {
				type: 'line',
				data: {
					labels: temperatureData.label,
					datasets: [
						{
							label: 'temperature dataset',
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
							data: temperatureData.value
						}
					]
				},
				options: gradientChartOptionsConfigurationWithTooltipPurple
			};

			const temperatureChart = new Chart(
				temperatureContext,
				temperatureConfig
			);
		}

		// 밝기
		{
			const brightnessAverageValue = '999';
			const brightnessData = {
				value: [50, 50, 50, 50, 50],
				label: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV']
			};

			const brightnessContext = document
				.getElementById('brightness-chart')
				.getContext('2d');

			const brightnessStroke = brightnessContext.createLinearGradient(
				0,
				230,
				0,
				50
			);

			brightnessStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
			brightnessStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); // green colors
			brightnessStroke.addColorStop(0, 'rgba(66,134,121,0)'); // green colors

			const brightnessConfig = {
				type: 'line',
				data: {
					labels: brightnessData.label,
					datasets: [
						{
							label: 'My First dataset',
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
							data: brightnessData.value
						}
					]
				},
				options: gradientChartOptionsConfigurationWithTooltipGreen
			};

			const brightnessChart = new Chart(
				brightnessContext,
				brightnessConfig
			);

			document.getElementById(
				'brightness-average-value'
			).innerText = `${brightnessAverageValue} LUX`;
		}

		// 전체
		{
			const totalAverageValue = '';
			const totalStatusData = {
				value: [100, 0, 100, 0, 100, 0, 100, 0, 100, 0, 100, 0],
				label: [
					'JAN',
					'FEB',
					'MAR',
					'APR',
					'MAY',
					'JUN',
					'JUL',
					'AUG',
					'SEP',
					'OCT',
					'NOV',
					'DEC'
				]
			};

			const totalContext = document
				.getElementById('total-status-chart')
				.getContext('2d');

			const totalGradientStroke = totalContext.createLinearGradient(
				0,
				230,
				0,
				50
			);

			totalGradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
			totalGradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
			totalGradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); // purple colors
			const totalChartConfig = {
				type: 'line',
				data: {
					labels: totalStatusData.label,
					datasets: [
						{
							label: 'total status dataset',
							fill: true,
							backgroundColor: totalGradientStroke,
							borderColor: '#d346b1',
							borderWidth: 2,
							borderDash: [],
							borderDashOffset: 0.0,
							pointBackgroundColor: '#d346b1',
							pointBorderColor: 'rgba(255,255,255,0)',
							pointHoverBackgroundColor: '#d346b1',
							pointBorderWidth: 20,
							pointHoverRadius: 4,
							pointHoverBorderWidth: 15,
							pointRadius: 4,
							data: totalStatusData.value
						}
					]
				},
				options: gradientChartOptionsConfigurationWithTooltipPurple
			};

			const totalChart = new Chart(totalContext, totalChartConfig);

			document.getElementById(
				'humidity-average-value'
			).innerText = `${totalAverageValue}%`;
		}

		// 습도
		{
			const humidityAverageValue = '80';
			const humidityData = {
				value: [100, 80, 70, 60, 50, 40, 20],
				label: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR', 'TS']
			};

			const humidityContext = document
				.getElementById('humidity-chart')
				.getContext('2d');

			const humidityGradient = humidityContext.createLinearGradient(
				0,
				230,
				0,
				50
			);

			// 파란색
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
					labels: humidityData.label,
					datasets: [
						{
							label: 'humidity value dataset',
							fill: true,
							backgroundColor: humidityGradient,
							hoverBackgroundColor: humidityGradient,
							borderColor: '#1f8ef1',
							borderWidth: 2,
							borderDash: [],
							borderDashOffset: 0.0,
							data: humidityData.value
						}
					]
				},
				options: gradientBarChartConfiguration
			};

			const humidityChart = new Chart(humidityContext, humidityConfig);

			document.getElementById(
				'humidity-average-value'
			).innerText = `${humidityAverageValue}%`;
		}
	}
};
