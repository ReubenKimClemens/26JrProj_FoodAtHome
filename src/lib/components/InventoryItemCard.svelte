<script>
    import { getCategoryColor } from '$lib/config/categoryColors.js';
  
    let {
        itemName = '2% Milk',
        quantity = 1,
        category = 'Dairy',
        addedDaysAgo = 2
    } = $props();
    
    let categoryColor = getCategoryColor(category);
</script>
  
<div class="item-card">
    <div class="item-header">
        <h3 class="item-name">{itemName}</h3>
        <span class="quantity">Qty: {quantity}</span>
    </div>
    
    <div class="item-footer">
      <span 
        class="category-badge"
        style="background: {categoryColor.bg}; color: {categoryColor.text};">
        {category}
        </span>
        <span class="timestamp">Added {addedDaysAgo} Days Ago</span>
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
  
    .item-name {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
    }
  
    .quantity {
        font-size: 16px;
        font-weight: bold;
    }
  
    .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  
    .category-badge {
        padding: 4px 12px;
        border-radius: 6px;
        font-size: var(--font-body-sm-size);
    }
  
    .timestamp {
        font-size: 14px;
        font-weight: 400;
        color: var(--text-secondary);
    }
</style>