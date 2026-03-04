<script>
    import ProgressBar from '$lib/components/ProgressBar.svelte';
    
    let { categories = [
        { name: 'Produce', amount: 50.76, percentage: 32, color: '#EF4444' },
        { name: 'Protein', amount: 39.65, percentage: 25, color: '#EF4444' },
        { name: 'Snacks', amount: 28.55, percentage: 18, color: '#3B82F6' },
        { name: 'Pantry', amount: 23.79, percentage: 15, color: '#8B5CF6' }
    ] } = $props();
    
    const total = $derived(categories.reduce((sum, cat) => sum + cat.amount, 0));
    
    let viewMode = $state('pie'); 
    
    // Calculate pie chart segments
    const pieSegments = $derived.by(() => {
        let cumulativePercent = 0;
        return categories.map(cat => {
            const startPercent = cumulativePercent;
            cumulativePercent += cat.percentage;
            return {
                ...cat,
                startPercent,
                endPercent: cumulativePercent
            };
        });
    });
    
    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }
    
    function createPieSlice(startPercent, endPercent) {
        const [startX, startY] = getCoordinatesForPercent(startPercent / 100);
        const [endX, endY] = getCoordinatesForPercent(endPercent / 100);
        
        const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;
        
        return [
            `M 0 0`,
            `L ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `Z`
        ].join(' ');
    }
</script>

<div class="container">
    <div class="button-wrapper">
        <ButtonGroup
            layout="2-column"
            defaults={{ size: "md", block: true }}
            buttons={[
                { 
                    label: "Pie Chart", 
                    variant: viewMode === 'pie' ? 'primary' : 'outline',
                    onClick: () => viewMode = 'pie'
                },
                { 
                    label: "Progress Bar", 
                    variant: viewMode === 'progress' ? 'primary' : 'outline',
                    onClick: () => viewMode = 'progress'
                }
            ]}
        />
    </div>

    {#if viewMode === 'pie'}
        <div class="pie-view">
            <div class="donut-container">
                <svg class="donut-chart" viewBox="-1.2 -1.2 2.4 2.4" style="transform: rotate(-90deg)">
                    {#each pieSegments as segment}
                        <path
                            d={createPieSlice(segment.startPercent, segment.endPercent)}
                            fill={segment.color}
                            class="donut-slice"
                        />
                    {/each}
                    <!-- Inner white circle to create donut effect -->
                    <circle cx="0" cy="0" r="0.6" fill="white" />
                </svg>
                
                <div class="donut-center">
                    <span class="total-amount title-lg">${total.toFixed(2)}</span>
                </div>
                
                <!-- Labels -->
                {#each pieSegments as segment, i}
                    {@const midPercent = (segment.startPercent + segment.endPercent) / 2}
                    {@const angle = (midPercent / 100) * 360 - 90}
                    {@const radians = (angle * Math.PI) / 180}
                    {@const labelRadius = 140}
                    {@const labelX = Math.cos(radians) * labelRadius}
                    {@const labelY = Math.sin(radians) * labelRadius}
                    
                    <div 
                        class="label-group" 
                        style="
                            left: calc(50% + {labelX}px);
                            top: calc(50% + {labelY}px);
                            transform: translate(-50%, -50%);
                        "
                    >
                        <span class="label-name body-sm">{segment.name}</span>
                        <span class="label-percent body-sm-bold" style="color: {segment.color}">{segment.percentage}%</span>
                        <span class="label-amount body-sm text-secondary">${segment.amount.toFixed(2)}</span>
                    </div>
                {/each}
            </div>

            <div class="progress-row">
                <ProgressBar value={category.amount} max={total} color={category.color} />
                <span class="percent body-md">{category.percentage}%</span>
            </div>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 24px;
        background: white;
        border-radius: var(--radius-rounded, 8px);
        box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    }

    .button-wrapper {
        width: 100%;
        overflow: hidden;
    }

    .button-wrapper :global(.btn-group) {
        min-width: 0;
        width: 100%;
    }

    .pie-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

    .donut-container {
        position: relative;
        width: 340px;
        height: 340px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .donut-chart {
        width: 240px;
        height: 240px;
        position: absolute;
    }

    .donut-slice {
        transition: opacity 0.2s ease;
    }

    .donut-center {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 3;
    }

    .total-amount {
        color: var(--text-default, #444955);
        font-family: 'Quicksand', sans-serif;
    }

    .label-group {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        text-align: center;
        white-space: nowrap;
        pointer-events: none;
        z-index: 3;
        background: white;
        padding: 2px 4px;
        border-radius: 4px;
    }

    .label-name {
        color: var(--text-default, #444955);
        font-family: 'Nunito', sans-serif;
    }

    .label-percent {
        font-family: 'Nunito', sans-serif;
    }

    .label-amount {
        color: var(--text-secondary, #737780);
        font-family: 'Nunito', sans-serif;
    }

    .text-secondary {
        color: var(--text-secondary, #737780);
    }

    .list {
        display: flex;
        background-color: white;
        flex-direction: column;
        gap: 16px;
        padding: 24px 32px;
        background: white;
        border-radius: var(--radius-rounded);
        font-family: var(--font-body);
        box-shadow: var(--box-shadow);
    }

    .row {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .header {
        display: flex;
        justify-content: space-between;
    }

    .name {
        color: var(--text-default);
    }

    .amount {
        color: var(--text-default);
    }

    .progress-row {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .percent {
        color: var(--text-secondary);
        min-width: 45px;
        text-align: right;
    }
</style>