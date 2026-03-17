<script>
  const spendingData = [
    { day: 1, amount: 56.80 },
    { day: 2, amount: 0 },
    { day: 3, amount: 0 },
    { day: 4, amount: 32.24 },
    { day: 5, amount: 27.40 },
    { day: 6, amount: 0 },
    { day: 7, amount: 42.18 },
    { day: 8, amount: 0 },
    { day: 9, amount: 81.67 },
    { day: 10, amount: 0 },
    { day: 11, amount: 0 },
    { day: 12, amount: 0 },
    { day: 13, amount: 0 },
    { day: 14, amount: 55.60 },
    { day: 15, amount: 0 },
    { day: 16, amount: 0 },
    { day: 17, amount: 60.00 },
    { day: 18, amount: 64.82 },
    { day: 19, amount: 29.0 },
    { day: 20, amount: 0 },
    { day: 21, amount: 0 },
    { day: 22, amount: 80.90 },
    { day: 23, amount: 0 },
    { day: 24, amount: 0 },
    { day: 25, amount: 45.7 },
    { day: 26, amount: 10.27 },
    { day: 27, amount: 0 },
    { day: 28, amount: 61.78 },
    { day: 29, amount: 27.45 },
    { day: 30, amount: 0 },
    { day: 31, amount: 0 },
  ];

  const maxAmount = 90;
  const chartHeight = 200;

  function getBarHeight(amount) {
    if (amount === null) return 0;
    return (amount / maxAmount) * chartHeight;
  }
</script>

<div class="spending-card">

  <div class="chart-shell">
    <div class="y-axis">
      <span>$100</span>
      <span>$80</span>
      <span>$60</span>
      <span>$40</span>
      <span>$20</span>
      <span>$0</span>
    </div>

    <div class="plot-wrapper">
        <div class="plot-scroll">

            <div class="bars">
            {#each spendingData as item}
                <div class="bar-group">
                {#if item.amount > 0}
                    <div class="amount-label">${item.amount}</div>
                {/if}
                <div
                    class:empty={item.amount === null}
                    class="bar"
                    style={`height: ${getBarHeight(item.amount)}px;`}
                ></div>
                </div>
            {/each}
            </div>

            <div class="x-labels">
            {#each spendingData as item}
                <div class="x-label">{item.day}</div>
            {/each}
            </div>
        </div>
        </div>
    </div>

    <div class="legend">
        <div class="spent"></div>
        <span class="body-sm">Amount Spent</span>
    </div>

    </div>

    

<style>

    .grid-lines {
    position: absolute;
    left: 1rem;  
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
    }

    .grid-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    border-top: 1px dotted var(--border-primary);
    }

    .legend {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        align-items: center;
        gap: 0.6rem;
    }

    .spent {
        height: 15px;
        width: 14px;
        border-radius: 3px;
        background: var(--bg-brand-primary);
    }
    .spending-card {
        max-width: 430px;
        width: 100%;
        margin: 0 auto;
        border-radius: 16px;
        box-sizing: border-box;
        background: var(--bg-page-secondary);
        border-radius: var(--radius-rounded);
        padding: 2rem 16px;
        box-shadow: var(--box-shadow);
        font-family: 'Nunito';
    }

    .chart-shell {
        display: flex;
        gap: 8px;
        align-items: stretch;
    }

    .y-axis {
        width: 36px;
        height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-shrink: 0;
        text-align: right;
        font-size: 12px;
        color: var(--text-default);
  }

    .plot-wrapper {
        flex: 1;
        overflow: hidden;
    }

    .plot-scroll {
        position: relative;  
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;


    }

    .plot-scroll::-webkit-scrollbar {
        display: none;
    }

    .bars {
        height: 220px;
        min-width: max-content;
        display: flex;
        align-items: flex-end;
        gap: 8px;
        padding: 8px 0 0;
        border-left: 1px solid var(--border-primary);
        border-bottom: 1px solid var(--border-primary);
        padding-left: 1rem; 

    }

    .bar-group {
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-shrink: 0;
        position: relative;
    }

    .amount-label {
        position: absolute;
        top: -20px;  
        left: 50%;
        transform: translateX(-50%);
        font-size: 10px;
        color: var(--text-default);
        white-space: nowrap;
    }

    .bar {
        width: 100%;
        border-radius: 6px 6px 0 0;
        background: var(--bg-brand-primary);
    }

    .bar.empty {
        background: transparent;
    }

    .x-labels {
        min-width: max-content;
        display: flex;
        gap: 8px;
        padding-top: 8px;
        margin-left: 1px;
        padding-left: 1rem; 

    }

    .x-label {
        width: 36px;
        flex-shrink: 0;
        text-align: center;
        font-size: 12px;
        color: var(--text-default);
    }

    .plot-scroll {
    scroll-snap-type: x mandatory;
    }

    .bar-group,
    .x-label {
    scroll-snap-align: start;
    }
</style>