<script>
    import ProgressBar from '$lib/components/ProgressBar.svelte';
    
    let { categories = [
        { name: 'Produce', amount: 50.76, percentage: 32, color: '#EF4444' },
        { name: 'Protein', amount: 39.65, percentage: 25, color: '#EF4444' },
        { name: 'Snacks', amount: 28.55, percentage: 18, color: '#3B82F6' },
        { name: 'Pantry', amount: 23.79, percentage: 15, color: '#8B5CF6' }
    ] } = $props();
    
    const total = $derived(categories.reduce((sum, cat) => sum + cat.amount, 0));
</script>

<div class="list">
    {#each categories as category}
        <div class="row">
            <div class="header">
                <span class="name body-md">{category.name}</span>
                <span class="amount body-md-bold">${category.amount.toFixed(2)}</span>
            </div>

            <div class="progress-row">
                <ProgressBar value={category.amount} max={total} color={category.color} />
                <span class="percent body-md">{category.percentage}%</span>
            </div>
        </div>
    {/each}
</div>

<style>
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