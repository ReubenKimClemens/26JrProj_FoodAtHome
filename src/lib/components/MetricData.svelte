<script>
    let {
        label = null,
        amount = null,
        count = null,
        date = null
    } = $props();
</script>

<div class="card">
    <div class="label">{label}</div>
    <div class="amount">{count}</div>
    {#if amount}
        <div class="amount">${amount.toFixed(2)}</div>
    {/if}
    {#if date}
        <div class="label">{date}</div>
    {/if}
</div>

<style>
    .card {
        background: white;
        border-radius: 16px;
        padding: 14px;
        box-shadow: var(--box-shadow);
        display: flex;
        flex-direction: column;
        width: 40%;
        gap: 5px;
        font-family: var(--font-body);
    }

    .label {
        font-size: 18px;
        color: #9CA3AF;
        font-weight: 500;
        
    }

    .amount {
        font-size: 24px;
        color: #1F2937;
        font-weight: 700;
    }
</style>