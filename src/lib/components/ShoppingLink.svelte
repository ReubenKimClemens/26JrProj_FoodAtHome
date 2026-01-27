<script>  
    import chevronRight from '$lib/assets/chevron-right.svg';
    
    let {
        groceryListName = "Costo-Oct",
        itemCount = 10
    } = $props();
</script>

<div class="shopping-link">
        <div class="list-name">{groceryListName}</div>
    <div class="right-side">
        <div class="item-count">
            <span>{itemCount}</span>
            <span>items</span>
        </div>
        <img src={chevronRight} alt='View list' class="icon" />
    </div>
</div>

<style>
.list-name {
    color: var(--text-default, #444955);
    font-size: 18px;
    font-family: var(--font-headings);
    text-transform: capitalize;
    line-height: 24px;
}

.item-count {
    padding: 6px 10px;
    background: var(--background-inverted-brand-secondary, #F6F2FB);
    color: var(--background-default-brand-secondary, #A07AD9);
    font-family: var(--font-body);
    border-radius: 360px;
    align-items: center;
    gap: 5px;
    display: flex;
}
.right-side {
    display: flex;
    align-items: center;
    gap: 12px;
}

.icon {
    width: 24px;
    height: 24px;
}

.shopping-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    background: white;
    border-bottom: 1px solid #E5E7EB;
    font-weight: 700;
}
</style>