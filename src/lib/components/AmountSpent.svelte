<script>
	import { onMount } from 'svelte';

	const spendingData = [
		{ day: 1, amount: 56.8 },
		{ day: 2, amount: 0 },
		{ day: 3, amount: 0 },
		{ day: 4, amount: 32.24 },
		{ day: 5, amount: 27.4 },
		{ day: 6, amount: 0 },
		{ day: 7, amount: 42.18 },
		{ day: 8, amount: 0 },
		{ day: 9, amount: 81.67 },
		{ day: 10, amount: 0 },
		{ day: 11, amount: 0 },
		{ day: 12, amount: 0 },
		{ day: 13, amount: 0 },
		{ day: 14, amount: 55.6 },
		{ day: 15, amount: 0 },
		{ day: 16, amount: 0 },
		{ day: 17, amount: 60.0 },
		{ day: 18, amount: 64.82 },
		{ day: 19, amount: 29.0 },
		{ day: 20, amount: 0 },
		{ day: 21, amount: 0 },
		{ day: 22, amount: 80.9 },
		{ day: 23, amount: 0 },
		{ day: 24, amount: 0 },
		{ day: 25, amount: 45.7 },
		{ day: 26, amount: 10.27 },
		{ day: 27, amount: 0 },
		{ day: 28, amount: 61.78 },
		{ day: 29, amount: 27.45 },
		{ day: 30, amount: 0 },
		{ day: 31, amount: 0 }
	];

	const BarColor = '#0FA376';
	const LabelColor = '#737780';
	const MinChartWidth = 430;
	const DayWidth = 44;
	const ChartHeight = 260;
	const StepSize = 20;

	const labels = spendingData.map((item) => item.day.toString());
	const amounts = spendingData.map((item) => item.amount);

	const maxAmount = Math.max(...amounts);
	const yMax = Math.ceil((maxAmount + 0.0001) / StepSize) * StepSize;
	const chartWidth = Math.max(spendingData.length * DayWidth, MinChartWidth);

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
						label: 'Amount Spent',
						data: amounts,
						backgroundColor: BarColor,
						hoverBackgroundColor: BarColor,
						borderRadius: 4,
						barThickness: 30,
						datalabels: {
							anchor: 'end',
							align: 'top',
							offset: 2,
							color: LabelColor,
							font: {
								size: 10,
								weight: '400'
							},
							formatter: (value) => (value > 0 ? `$${Number(value).toFixed(2)}` : '')
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
						},
						ticks: {
							color: LabelColor
						}
					},
					y: {
						beginAtZero: true,
						max: yMax,
						ticks: {
							stepSize: StepSize,
							callback: (value) => `$${value}`,
							color: LabelColor
						},
						grid: {
							color: '#E5E7EB'
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
		color: #444;
	}

	.legend-box {
		width: 14px;
		height: 14px;
		border-radius: 4px;
		display: inline-block;
	}

	.spent {
		background: var(--text-brand-primary);
	}
</style>