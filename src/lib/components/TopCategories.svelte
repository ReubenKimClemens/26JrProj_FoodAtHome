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
                <span class="name">{category.name}</span>
                <span class="amount">${category.amount.toFixed(2)}</span>
            </div>
            <div class="progress-row">
                <ProgressBar value={category.amount} max={total} color={category.color} />
                <span class="percent">{category.percentage}%</span>
            </div>
        </div>
    {/each}
</div>

<style>
    .list {
        display: flex;
        background-color: white;
        flex-direction: column;
        gap: 20px;
        padding: 16px;
        background: white;
        border-radius: 16px;
        font-family: var(--font-body);
        box-shadow: var(--box-shadow);
    }

    .row {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .header {
        display: flex;
        justify-content: space-between;
    }

    .name {
        font-size: 18px;
        color: #6B7280;
    }

    .amount {
        font-size: 18px;
        color: #1F2937;
        font-weight: 600;
    }

    .progress-row {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .percent {
        font-size: 16px;
        color: #9CA3AF;
        min-width: 45px;
        text-align: right;
    }
</style>