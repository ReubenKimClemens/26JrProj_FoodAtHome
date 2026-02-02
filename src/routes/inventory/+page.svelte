<script>
    import CategoryIcon from '$lib/components/CategoryIcon.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import InventoryList from '$lib/components/InventoryList.svelte';
    import ListGridToggle from '$lib/components/ListGridToggle.svelte';
    import SwipeableItem from '$lib/components/SwipeableItem.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import PlusIcon from '$lib/assets/plus.svg';
    import { getDaysSinceAdded, deleteReceiptItem } from '$lib/api/receipts.js';

    let { data } = $props();
        
    let selectedCategory = $state('All');
    let sortOrder = $state('Newest First');
    
    let allItems = $state([...data.allItems]);

    // Remove the () from $derived - it's not a function
    let filteredAndSortedItems = $derived.by(() => {
        // Filter by category
        let items = selectedCategory === 'All' 
            ? allItems 
            : allItems.filter(item => item.category === selectedCategory);
        
        // Sort by date
        if (sortOrder === 'Newest First') {
            items = [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
            items = [...items].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        
        return items;
    });

    async function handleDelete(itemId) {
        try {
            await deleteReceiptItem(itemId);
            allItems = allItems.filter(item => item.id !== itemId);
        } catch (error) {
            console.error('Failed to delete:', error);
            alert('Failed to delete item');
        }
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
            <Dropdown bind:value={sortOrder} 
                options={['Newest First', 'Oldest First']}
                placeholder="Newest First" />
        </div>
        <ListGridToggle />
    </div>
    
    <h3 class="swipe-tip">Swipe right to TOSS | Swipe left to CHOMP</h3>
    {#each filteredAndSortedItems as item (item.id)}
    <SwipeableItem 
        itemName={item.item_name}
        quantity={item.quantity}
        category={item.category || 'Uncategorized'}
        addedDaysAgo={getDaysSinceAdded(item.created_at)}
        onToss={() => handleDelete(item.id)}
        onChomp={() => handleDelete(item.id)}
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