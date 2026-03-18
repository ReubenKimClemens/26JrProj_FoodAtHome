<script>
  const spendingData = [
    { month: 'Aug', amount: 169.50},
    { month: 'Sep', amount: 220.73 },
    { month: 'Oct', amount: 550 },
    { month: 'Nov', amount: 250 },
    { month: 'Dec', amount: 300 },
  ];

  const maxAmount = 550;
  const chartHeight = 200;

  function getBarHeight(amount) {
    if (amount === null) return 0;
    return (amount / maxAmount) * chartHeight;
  }
</script>

<div class="spending-card">

  <div class="chart-shell">
    <div class="y-axis">
      <span>$600</span>
      <span>$500</span>
      <span>$400</span>
      <span>$300</span>
      <span>$200</span>
      <span>$100</span>
      <span>$0</span>
    </div>

    <div class="plot-wrapper">
      <div class="plot-scroll">
        <div class="plot-content">
          <div class="bars">
          {#each spendingData as item}
              <div class="bar-group">
              {#if item.amount > 0}
                  <div class="amount-label">${item.amount.toFixed(2)}</div>
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
              <div class="x-label">{item.month}</div>
          {/each}
          </div>
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
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr);
        gap: 8px;
        align-items: start;
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
        transform: translateY(10px);
 
  }

    .plot-wrapper {
        min-width: 0;
        overflow: hidden;
    }

    .plot-scroll {
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding-top: 4px;
    }

    .plot-scroll::-webkit-scrollbar {
        display: none;
    }

    .plot-content {
        min-width: max-content;
    }

    .bars {
        height: 220px;
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

</style>
