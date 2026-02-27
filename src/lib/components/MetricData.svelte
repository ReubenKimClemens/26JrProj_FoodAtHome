<script>
    let {
        label = null,
        amount = null,
        count = null,
        date = null
    } = $props();
</script>

<div class="card">
    <div class="label body-sm">{label}</div>
    <div class="amount title-md">{count}</div>
    {#if amount}
        <div class="amount title-md">${amount.toFixed(2)}</div>
    {/if}
    {#if date}
        <div class="label body-sm">{date}</div>
    {/if}
</div>

<style>
    .card {
        background: var(--bg-page-secondary);
        border-radius: var(--radius-rounded);
        padding: 12px 16px;
        box-shadow: var(--box-shadow);
        display: flex;
        flex-direction: column;
        width: calc(100/2);
        gap: 8px;
    }

    .label {
        color: var(--text-secondary);
        
    }

    .amount {
        color: var(--text-default);
    }


</style>