<script>
    import { getCategoryColor } from '$lib/categoryColors.js';
  
    let {
        itemName = '2% Milk',
        quantity = 1,
        category = 'Dairy',
        addedDaysAgo = 2
    } = $props();
    
    let categoryColor = $derived(getCategoryColor(category));


    function calculateDate(num) {
        if (num === 0) return 'Today';
        if (num === 1) return 'Yesterday';
        return num + ' Days Ago';
    }
</script>
  
<div class="item-card">
    <div class="item-header">
        <h3 class="title-sm">{itemName}</h3>
        <span class="title-sm">Qty: {quantity}</span>
    </div>
    
    <div class="item-footer">
      <span 
        class="category-badge body-sm-bold"
        style="background: {categoryColor.light}; color: {categoryColor.dark};">
        {category}
        </span>
        <span class="timestamp body-sm">Added {calculateDate(addedDaysAgo)}</span>
    </div>
</div>
  
<style>
    .item-card {
        background: var(--bg-page-secondary);
        border-radius: var(--radius-rounded);
        padding: 20px 24px;
        box-shadow: var(--box-shadow);
        color: var(--text-default);
        font-family: var(--font-body);
    }
  
    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
  
    .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  
    .category-badge {
        padding: 4px 8px;
        border-radius: var(--radius-full);
    }

    .timestamp {
        color: var(--text-secondary);
    }
</style>