<script>
    import { addReceiptItem, updateReceiptItem } from '$lib/api/receipts.js';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import CategoryIcon from '$lib/components/CategoryIcon.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import ListGridToggle from '$lib/components/ListGridToggle.svelte';
    import SwipeableItem from '$lib/components/SwipeableItem.svelte';
    import GridViewCard from '$lib/components/GridViewCard.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import TrashIcon from '$lib/assets/icon_trash_black.svg';
    import PlusIcon from '$lib/assets/icon_plus.svg';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import { getDaysSinceAdded, deleteReceiptItem } from '$lib/api/receipts.js';
    import { incrementChomped, incrementTossed } from '$lib/api/metric.js';
    import { page } from '$app/stores';

    const userId = '5a9e584a-69a4-476d-8c23-d8d403b87bec';

    $effect(() => {
        if ($page.state?.showToast) {
            toastShow = true;
        }
    });

    let toastShow = $state(false);
    let lastAddedItem = $state(null);
    
    let { data } = $props();
    let view = $state('list');
    let selectedCategory = $state('All');
    let sortOrder = $state('Newest First');
    let allItems = $state([...data.allItems]);
    let addModalOpen = $state(false);
    let editModalOpen = $state(false);
    let editingItem = $state(null);
    let searchQuery = $state('');
    let filteredAndSortedItems = $derived.by(() => {
        let items = selectedCategory === 'All' 
            ? allItems 
            : allItems.filter(item => item.category === selectedCategory);

        // Filter by search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            items = items.filter(item => 
                item.item_name?.toLowerCase().includes(q) ||
                item.category?.toLowerCase().includes(q)
            );
        }
        
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
        }
    }

    async function handleToss(item) {
        try {
            if (item.quantity <= 1) {
                await deleteReceiptItem(item.id);
                allItems = allItems.filter(i => i.id !== item.id);
            } else {
                const newQty = item.quantity - 1;
                await updateReceiptItem(item.id, 'quantity', newQty);
                allItems = allItems.map(i =>
                    i.id === item.id ? { ...i, quantity: newQty } : i
                );
            }
            await incrementTossed(userId);
        } catch (error) {
            console.error('Failed to toss:', error);
        }
    }

    async function handleChomp(item) {
        try {
            if (item.quantity <= 1) {
                await deleteReceiptItem(item.id);
                allItems = allItems.filter(i => i.id !== item.id);
            } else {
                const newQty = item.quantity - 1;
                await updateReceiptItem(item.id, 'quantity', newQty);
                allItems = allItems.map(i =>
                    i.id === item.id ? { ...i, quantity: newQty } : i
                );
            }
            await incrementChomped(userId);
        } catch (error) {
            console.error('Failed to chomp:', error);
        }
    }

    async function handleAdd(itemData) {
    try {
        const newItem = await addReceiptItem(userId, itemData);
        allItems = [...allItems, newItem];
        lastAddedItem = newItem;
        toastShow = true;
    } catch (error) {
        console.error('Failed to add item:', error);
        alert('Failed to add item. Please try again.');
    }
    }

    async function handleUndoAdd() {
    if (!lastAddedItem) return;
    try {
        await deleteReceiptItem(lastAddedItem.id);
        allItems = allItems.filter(item => item.id !== lastAddedItem.id);
        lastAddedItem = null;
    } catch (error) {
        console.error('Failed to undo:', error);
    }
    }

    async function handleEdit(itemData) {
        try {
            await updateReceiptItem(editingItem.id, 'item_name', itemData.itemName);
            await updateReceiptItem(editingItem.id, 'quantity', itemData.quantity);
            await updateReceiptItem(editingItem.id, 'unit_name', itemData.unit);
            await updateReceiptItem(editingItem.id, 'category', itemData.category);
            await updateReceiptItem(editingItem.id, 'notes', itemData.note || null);
            await updateReceiptItem(editingItem.id, 'unit_price', itemData.price ?? null);
            await updateReceiptItem(
                editingItem.id,
                'total_price',
                itemData.price !== null && itemData.price !== undefined && itemData.price !== ''
                    ? itemData.price * itemData.quantity
                    : null
            );
            if (itemData.date) {
                await updateReceiptItem(editingItem.id, 'created_at', new Date(itemData.date).toISOString());
            }

            allItems = allItems.map(item =>
                item.id === editingItem.id
                    ? {
                        ...item,
                        item_name: itemData.itemName,
                        quantity: itemData.quantity,
                        unit_name: itemData.unit,
                        category: itemData.category,
                        unit_price: itemData.price ?? null,
                        total_price: itemData.price != null && itemData.quantity
                            ? itemData.price * itemData.quantity
                            : null,
                        notes: itemData.note || null,
                        created_at: itemData.date ? new Date(itemData.date).toISOString() : item.created_at
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
        <PageHeader title="Inventory" />
        <div class="header-actions">
            <a href="/profile/recently-deleted" class="add-button" aria-label="Recently deleted items">
                <img src={TrashIcon} alt="" />
            </a>
            <button onclick={() => addModalOpen = true} class="add-button" aria-label="Add new item">
                <img src={PlusIcon} alt="" />
            </button>
        </div>
    </header>

    <SearchBar bind:value={searchQuery} placeholder="Search" />

    <CategoryIcon bind:activeCategory={selectedCategory} />

    <div class="filters">
        <div class="filter-dropdown">
            <Dropdown 
                bind:value={sortOrder} 
                options={['Newest First', 'Oldest First']}
                placeholder="Newest First" 
            />
        </div>
        
        <ListGridToggle bind:view />
    </div>
    
    {#if view === 'list'}
        <p class="swipe-tip body-sm">Swipe right to TOSS | Swipe left to CHOMP | Tap to EDIT</p>
        {#each filteredAndSortedItems as item (item.id)}
            <SwipeableItem 
                itemName={item.item_name}
                quantity={item.quantity}
                category={item.category || 'Uncategorized'}
                addedDaysAgo={getDaysSinceAdded(item.created_at)}
                onToss={() => handleToss(item)}
                onChomp={() => handleChomp(item)}
                onTap={() => openEditModal(item)}
            />
        {/each}
    {:else}
        <div class="grid">
            {#each filteredAndSortedItems as item (item.id)}
                <button onclick={() => openEditModal(item)} class="grid-item">
                    <GridViewCard
                        category={item.category || 'Uncategorized'}
                        name={item.item_name}
                        daysAgo={getDaysSinceAdded(item.created_at)}
                        count={item.quantity}
                    />
                </button>
            {/each}
        </div>
    {/if}
    
    <Toast
    message="Item has been added!"
    bind:show={toastShow}
    onUndo={handleUndoAdd}
    />
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
    onDelete={() => handleDelete(editingItem.id)}
    initialData={editingItem}
/>

<style>
    .inventory-screen {
        padding-bottom: 1rem;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .title-and-add {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        text-align: center;
        font-family: 'Nunito', sans-serif;
        margin: 0 0 1rem 0;
    }

    .add-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background-color 0.2s;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .grid-item {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
    }
</style>