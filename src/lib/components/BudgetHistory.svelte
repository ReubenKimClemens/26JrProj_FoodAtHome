<script>
	import { onMount } from 'svelte';

	const spendingData = [
		{ month: 'Aug', amount: 169.5 },
		{ month: 'Sep', amount: 220.73 },
		{ month: 'Oct', amount: 549.0 },
		{ month: 'Nov', amount: 326 },
		{ month: 'Dec', amount: 295 },
		{ month: 'Jan', amount: 0 }
	];

	const goalData = [300, 300, 300, 300, 400];

	const BarColor = '#B5E2D5';
	const LineColor = '#A07AD9';
	const LabelColor = '#737780';
	const MinChartWidth = 430;
	const BarWidth = 64;
	const ChartHeight = 260;

	const labels = spendingData.map((item) => item.month);
	const amounts = spendingData.map((item) => item.amount);

	const spentMax = Math.max(...amounts);
	const goalMax = Math.max(...goalData);
	const overallMax = Math.max(spentMax, goalMax);
	const yMax = Math.ceil((overallMax + 0.0001) / 100) * 100;

	const chartWidth = Math.max(spendingData.length * BarWidth, MinChartWidth);

	let canvas;
	let chart;

	onMount(async () => {
		const { default: Chart } = await import('chart.js/auto');
		const { default: ChartDataLabels } = await import('chartjs-plugin-datalabels');

		Chart.register(ChartDataLabels);

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						type: 'line',
						label: 'Budget Goal',
						data: goalData,
						borderColor: LineColor,
						backgroundColor: LineColor,
						pointBackgroundColor: LineColor,
						pointBorderColor: LineColor,
						pointRadius: 2,
						pointHoverRadius: 2,
						borderWidth: 3,
						tension: 0.35,
						fill: false,
						datalabels: {
							display: false
						}
					},
					{
						type: 'bar',
						label: 'Amount Spent',
						data: amounts,
						backgroundColor: BarColor,
						hoverBackgroundColor: BarColor,
						borderRadius: 6,
						barThickness: 36,
						order: 2,
						datalabels: {
							anchor: 'end',
							align: 'top',
							color: LabelColor,
							font: {
								size: 10,
								weight: '400'
							},
							formatter: (value) => `$${Number(value).toFixed(2)}`
						}
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				events: [],
				plugins: {
					tooltip: {
						enabled: false
					},
					legend: {
						display: false
					}
				},
				scales: {
					x: {
						grid: {
							display: false
						},
						border: {
							display: true,
                            color: '#111215',
                            z: 1
						}
					},
					y: {
						beginAtZero: true,
						max: yMax,
						ticks: {
							stepSize: 100,
							callback: (value) => `$${value}`
						},
						border: {
							display: true,
                            color: '#111215'
						}
					}
				}
			}
		});

		return () => {
			chart?.destroy();
		};
	});
</script>

<div class="spending-card">
	<div class="chart-scroll">
		<div class="chart-inner" style={`width: ${chartWidth}px;`}>
			<canvas bind:this={canvas}></canvas>
		</div>
	</div>

	<div class="legend">
		<div class="legend-item">
			<span class="legend-box spent"></span>
			<span>Amount Spent</span>
		</div>

		<div class="legend-item">
			<span class="legend-line"></span>
			<span>Budget Goal</span>
		</div>
	</div>
</div>

<style>
	.spending-card {
		max-width: 430px;
		width: 100%;
		height: 350px;
		margin: 0 auto;
		box-sizing: border-box;
		background: var(--bg-page-secondary);
		border-radius: var(--radius-rounded);
		padding: 2rem 1rem 4rem;
		box-shadow: var(--box-shadow);
		font-family: 'Nunito';
	}

	.chart-scroll {
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}

	.chart-scroll::-webkit-scrollbar {
		display: none;
	}

	.chart-inner {
		height: 260px;
		min-width: 430px;
		position: relative;
	}

	.legend {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin-top: 12px;
		padding-bottom: 1rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: var(--text-default);
	}

	.legend-box {
		width: 14px;
		height: 14px;
		border-radius: 4px;
		display: inline-block;
	}

	.spent {
		background: #B5E2D5;
	}

	.legend-line {
		width: 18px;
		border-top: 3px solid var(--bg-brand-secondary);
		display: inline-block;
	}
</style>