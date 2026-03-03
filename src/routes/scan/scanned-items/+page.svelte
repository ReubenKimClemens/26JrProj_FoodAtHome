<script>
    import { goto } from '$app/navigation';
    import { ArrowLeft, Plus } from 'lucide-svelte';
    import ButtonGroup from "$lib/components/ButtonGroup.svelte";
    import EditDeleteItemCard from '$lib/components/EditDeleteItemCard.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { addReceiptItem } from '$lib/api/receipts';
    import { page } from '$app/stores';

    let navState = $page.state || {};
    let storeName = $state(navState.storeName || 'Unknown Store');
    let date = $state(navState.date || new Date().toLocaleDateString());
    let totalPrice = $state(navState.total ? `$${navState.total.toFixed(2)}` : '$0.00');
    let items = $state(navState.items || []);

    let modalOpen = $state(false);
    let modalTitle = $state('Add New Item');
    let editingItem = $state(null);

    function handleDelete(id) {
        items = items.filter(item => item.id !== id);
    }

    function handleEdit(item) {
        editingItem = {
            id: item.id,
            item_name: item.itemName,
            unit_price: item.price,
            category: item.category,
            quantity: item.quantity
        };
        modalTitle = 'Edit Item';
        modalOpen = true;
    }

    function handleAdd() {
        editingItem = null;
        modalTitle = 'Add New Item';
        modalOpen = true;
    }

    function handleSave(data) {
        if (editingItem) {
            items = items.map(item => 
                item.id === editingItem.id 
                    ? { ...item, itemName: data.itemName, category: data.category, quantity: data.quantity, price: parseFloat(data.price.replace('$', '')) || 0 }
                    : item
            );
        } else {
            const newItem = {
                id: Date.now(),
                itemName: data.itemName,
                category: data.category,
                quantity: data.quantity,
                price: parseFloat(data.price.replace('$', '')) || 0
            };
            items = [...items, newItem];
        }
    }

    async function handleConfirm() {
        try {
            for (const item of items) {
                await addReceiptItem(userId, {
                    itemName: item.itemName,
                    quantity: item.quantity,
                    price: `$${item.price}`,
                    category: item.category
                });
            }
            goto('/inventory');
        } catch (error) {
            console.error('Error saving:', error);
        }
    }
</script>

<div class="page">
    <header>
        <button class="icon-btn" onclick={() => goto('/scan')}>
            <ArrowLeft size={24} />
        </button>

        <div class="store-info">
            <h1>{storeName}</h1>
            <p class="subtitle">{date} - {totalPrice}</p>
        </div>

        <button class="icon-btn" onclick={handleAdd}>
            <Plus size={24} />
        </button>
    </header>

    <main class="items-container">
        {#each items as item (item.id)}
            <EditDeleteItemCard 
                itemName={item.itemName} 
                category={item.category} 
                quantity={item.quantity} 
                price={item.price}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item)}
            />
        {/each}
    </main>

    <footer>
        <ButtonGroup
            layout="2-column"
            defaults={{ size: "md", block: true }}
            buttons={[
                { label: "Rescan", variant: "outline", onClick: () => goto('/scan') },
                { label: "Confirm", variant: "primary", onClick: handleConfirm }
            ]}
        />
    </footer>
</div>

<Modal 
    bind:open={modalOpen} 
    title={modalTitle}
    initialData={editingItem}
    onAdd={handleSave}
/>

<style>
    .page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: var(--spacing-s);
        font-family: var(--font-body);
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: var(--spacing-s);
    }

    .icon-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: var(--spacing-xs);
    }

    .store-info {
        text-align: center;
    }

    .store-info h1 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
    }

    .subtitle {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin: 0;
    }

    .items-container {
        display: flex;
        flex-direction: column;
        padding-bottom: 5rem;
        gap: .75rem;
    }

    footer {
        display: flex;
        gap: var(--spacing-s);
        padding-top: var(--spacing-s);
    }
</style>