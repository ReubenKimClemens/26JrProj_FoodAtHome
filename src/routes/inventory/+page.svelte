<script>
    import CategoryIcon from '$lib/components/CategoryIcon.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import InventoryList from '$lib/components/InventoryList.svelte';
    import ListGridToggle from '$lib/components/ListGridToggle.svelte';
    import SwipeableItem from '$lib/components/SwipeableItem.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import PlusIcon from '$lib/assets/plus.svg';
        
    let selectedCategory = $state('All');
    let items = $state([
        { id: 1, itemName: '2% Milk', quantity: 1, category: 'Dairy', addedDaysAgo: 2 },
        { id: 2, itemName: 'Eggs', quantity: 12, category: 'Dairy', addedDaysAgo: 1 },
        { id: 3, itemName: 'Bread', quantity: 1, category: 'Bakery', addedDaysAgo: 3 },
        { id: 4, itemName: 'Bananas', quantity: 6, category: 'Produce', addedDaysAgo: 0 }
    ]);

    function removeItem(itemId) {
        items = items.filter(i => i.id !== itemId);
    }

    let addModalOpen = $state(false);
    let editModalOpen = $state(false);
    
    function handleAdd(itemData) {
        console.log('New item added:', itemData);
    }
    
    function handleReset() {
        console.log('Form reset');
    }
</script>

<div class="inventory-screen">
    <div class="title-and-add">
        <h1>Inventory</h1>
        <button onclick={() => addModalOpen = true} class="add-button">
            <img src={PlusIcon} alt="Add" />
        </button>
    </div>
    <CategoryIcon bind:activeCategory={selectedCategory} />

    <div class="filters">
        <div class="filter-dropdown">
            <Dropdown bind:value={selectedCategory} 
                options={['Newest First', 'Oldest First']}
                placeholder="Newest First" />
        </div>
        <ListGridToggle />
    </div>
    
    <h3 class="swipe-tip">Swipe right to TOSS | Swipe left to CHOMP</h3>
    {#each items as item (item.id)}
    <SwipeableItem 
        itemName={item.itemName}
        quantity={item.quantity}
        category={item.category}
        addedDaysAgo={item.addedDaysAgo}
        onToss={() => removeItem(item.id)}
        onChomp={() => removeItem(item.id)}
    />
    {/each}
</div>
<Modal 
    bind:open={addModalOpen}
    title="Add New Item"
    onAdd={handleAdd}
    onReset={handleReset}
/>
<Modal 
    bind:open={editModalOpen}
    title="Edit Item"
    onAdd={handleAdd}
    onReset={handleReset}
/>

<style>
    .inventory-screen {
        font-family: var(--font-family-title);
        padding-bottom: 7rem;
        width: 90%;
        align-self: center;
    }
    .filters {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .filter-dropdown {
        width: 50%;
    }
    .title-and-add {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .swipe-tip {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
        margin-bottom: 1rem;
        text-align: center;
    }
    .add-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
</style>