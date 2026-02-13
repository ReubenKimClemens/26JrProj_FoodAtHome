<script>
    import { addReceiptItem, updateReceiptItem } from '$lib/api/receipts.js';
    import CategoryIcon from '$lib/components/CategoryIcon.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import ListGridToggle from '$lib/components/ListGridToggle.svelte';
    import SwipeableItem from '$lib/components/SwipeableItem.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import PlusIcon from '$lib/assets/plus.svg';
    import { getDaysSinceAdded, deleteReceiptItem } from '$lib/api/receipts.js';

    let { data } = $props();
        
    let selectedCategory = $state('All');
    let sortOrder = $state('Newest First');
    let allItems = $state([...data.allItems]);
    let addModalOpen = $state(false);
    let editModalOpen = $state(false);
    let editingItem = $state(null);

    let filteredAndSortedItems = $derived.by(() => {
        let items = selectedCategory === 'All' 
            ? allItems 
            : allItems.filter(item => item.category === selectedCategory);
        
        return sortOrder === 'Newest First'
            ? items.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
            : items.toSorted((a, b) => new Date(a.created_at) - new Date(b.created_at));
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
    
    async function handleAdd(itemData) {
        try {
            const userId = '5a9e584a-69a4-476d-8c23-d8d403b87bec';
            const newItem = await addReceiptItem(userId, itemData);
            allItems = [...allItems, newItem];
            console.log('Item added successfully!');
        } catch (error) {
            console.error('Failed to add item:', error);
            alert('Failed to add item. Please try again.');
        }
    }

    async function handleEdit(itemData) {
        try {
            await updateReceiptItem(editingItem.id, 'item_name', itemData.itemName);
            await updateReceiptItem(editingItem.id, 'quantity', itemData.quantity);
            await updateReceiptItem(editingItem.id, 'unit_name', itemData.unit);
            await updateReceiptItem(editingItem.id, 'category', itemData.category);
            
            if (itemData.price) {
                const price = parseFloat(itemData.price.replace(/[$,]/g, ''));
                await updateReceiptItem(editingItem.id, 'unit_price', price);
                await updateReceiptItem(editingItem.id, 'total_price', price * itemData.quantity);
            }

            allItems = allItems.map(item => 
                item.id === editingItem.id 
                    ? {
                        ...item,
                        item_name: itemData.itemName,
                        quantity: itemData.quantity,
                        unit_name: itemData.unit,
                        category: itemData.category,
                        unit_price: itemData.price ? parseFloat(itemData.price.replace(/[$,]/g, '')) : null
                    }
                    : item
            );

            console.log('Item updated successfully!');
        } catch (error) {
            console.error('Failed to update item:', error);
            alert('Failed to update item. Please try again.');
        }
    }

    function openEditModal(item) {
        editingItem = item;
        editModalOpen = true;
    }
</script>

<div class="inventory-screen">
    <header class="title-and-add">
        <h1 class="title-lg">Inventory</h1>
        <button onclick={() => addModalOpen = true} class="add-button" aria-label="Add new item">
            <img src={PlusIcon} alt="" />
        </button>
    </header>

    <CategoryIcon bind:activeCategory={selectedCategory} />

    <div class="filters">
        <div class="filter-dropdown">
            <Dropdown 
            bind:value={sortOrder} 
            options={['Newest First', 'Oldest First']}
            placeholder="Newest First" 
        />
        </div>
        
        <ListGridToggle />
    </div>
    
    <p class="swipe-tip body-sm">Swipe right to TOSS | Swipe left to CHOMP | Tap to EDIT</p>

    {#each filteredAndSortedItems as item (item.id)}
        <SwipeableItem 
            itemName={item.item_name}
            quantity={item.quantity}
            category={item.category || 'Uncategorized'}
            addedDaysAgo={getDaysSinceAdded(item.created_at)}
            onToss={() => handleDelete(item.id)}
            onChomp={() => handleDelete(item.id)}
            onTap={() => openEditModal(item)}
        />
    {/each}
</div>

<Modal 
    bind:open={addModalOpen}
    title="Add New Item"
    onAdd={handleAdd}
/>

<Modal 
    bind:open={editModalOpen}
    title="Edit Item"
    onAdd={handleEdit}
    initialData={editingItem}
/>

<style>
    .inventory-screen {
        font-family: var(--font-family-title);
        padding-bottom: 7rem;
    }

    .title-and-add {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    h1 {
        margin: 0;
    }

    .filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        justify-content: space-between;
    }
    .filter-dropdown {
        width: fit-content;
    }


    .swipe-tip {
        font-size: 0.9rem;
        color: var(--text-secondary);
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

    .add-button:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>