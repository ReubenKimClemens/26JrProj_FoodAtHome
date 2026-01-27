<script>  
    let {
        totalItems = 10,
        chosenCategoryName = 'Protein',
        chosenCategoryCount = 3,
        otherCategories = 7
    } = $props();
</script>

<div class="inventory-content-card">
    <div class="row total-items">
        <span>total items</span>
        <span>{totalItems}</span>
    </div>
    <div class="row">
        <span>{chosenCategoryName}</span>
        <span>{chosenCategoryCount}</span>
    </div>
    <div class="row">
        <span>Others</span>
        <span>{otherCategories}</span>
    </div>
</div>

<style>
    .inventory-content-card {
        background: var(--bg-page-secondary);
        border-radius: var(--radius-rounded);
        padding: 20px 24px;
        box-shadow: var(--box-shadow);
        color: var(--text-secondary);
        font-family: var(--font-body);
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        font-size: 20px;
        text-transform: capitalize;
    }
    
    .total-items {
        color: var(--text-default);
        font-weight: 700;
    }

    .row {
        align-self: stretch;
        justify-content: space-between;
        align-items: center;
        display: flex;
        padding-bottom: 5px;
    }
</style>