<script>
    import { getCategoryColor } from '$lib/config/categoryColors.js';
    import deleteIcon from '$lib/assets/delete.svg';
    import editIcon from '$lib/assets/edit.svg';
    
    let {
        itemName = '2% Milk',
        quantity = 1,
        category = 'Dairy',
        price = 4.99,
        onDelete = () => {},
        onEdit = () => {}
    } = $props();
  
    let categoryColor = getCategoryColor(category);
</script>
  
<div class="item-card">
    <div class="columns">
        <h3 class="item-name">{itemName}</h3>
        <div class="item-footer">
            <span 
                class="category-badge"
                style="background: {categoryColor.bg}; color: {categoryColor.text};">
                {category}
            </span>
            <span class="quantity">Qty: {quantity}</span>
        </div>
    </div>
    <div class="columns">
        <span>${price}</span>
        <div class="actions">
            <button class="icon-btn" onclick={onDelete}>
                <img src={deleteIcon} alt="Delete" class="icon" />
            </button>
            <button class="icon-btn" onclick={onEdit}>
                <img src={editIcon} alt="Edit" class="icon" />
            </button>
        </div>
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
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
    }
  
    .columns {
        flex-direction: column;
        display: flex;
        justify-content: center;
    }

    .item-name {
        margin: 0;
    }
  
    .quantity {
        font-size: 16px;
        color: var(--text-secondary, #737780);
    }
  
    .item-footer {
        display: flex;
        gap: 5px;
        align-items: center;
    }
  
    .category-badge {
        padding: 4px 12px;
        border-radius: 6px;
        font-size: var(--font-body-sm-size);
    }

    .actions {
        display: flex;
        gap: 4px;
    }

    .icon-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
    }

    .icon {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }
</style>