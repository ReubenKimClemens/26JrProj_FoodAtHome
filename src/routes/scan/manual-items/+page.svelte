<script>
    // Manual Items Page
    import { goto } from '$app/navigation';
    import { ArrowLeft, Plus } from 'lucide-svelte';
    import ButtonGroup from "$lib/components/ButtonGroup.svelte";
    import EditDeleteItemCard from '$lib/components/EditDeleteItemCard.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { addReceiptItem } from '$lib/api/receipts';
    import InputField from '$lib/components/InputField.svelte';
    import { page } from '$app/stores';

    let storeName = $state('Walmart');
    let date = $state('2025-12-09');
    let userId = '5a9e584a-69a4-476d-8c23-d8d403b87bec';

    let totalPrice = $derived(() => {
       const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
       return `$${total.toFixed(2)}`;
   });

    let items = $state([]);

    $effect(() => {
        if ($page.state?.existingItems) {
            items = $page.state.existingItems;
        }
    });

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
        <div class="receipt-info">
            <div class="row">
                <button class="icon-btn" onclick={() => goto('/scan')}>
                    <ArrowLeft size={24} />
                </button>
                <h2>Add Items Manually</h2>
                <button class="icon-btn" onclick={handleAdd}>
                    <Plus size={24} />
                </button>
            </div>
            <InputField label="Store" bind:value={storeName} />
            <div class="row two-columns">
                <div class="date">
                    <InputField label="Purchased Date" type="date" bind:value={date} />
                </div>
                <div class="price">
                    <h3>Receipt Total:</h3>
                    <h3>{totalPrice()}</h3>
                </div>
                
            </div>
        </div>
        
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
                { label: "Upload Receipt", variant: "outline", onClick: () => goto('/scan') },
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

    .receipt-info {
       display: flex;
       flex-direction: column;
       width: 100%;
       padding-bottom: var(--spacing-md);
   }

   .row {
       display: flex;
       justify-content: space-between;
       align-items: center;
   }

    .items-container {
        display: flex;
        flex: .70;
        flex-direction: column;
        padding-bottom: 5rem;
        gap: .75rem;
    }
    .price {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .price h3 {
        margin: 0;
    }
    .date {
        width: 50%;
    }
    footer {
        display: flex;
        gap: var(--spacing-s);
        padding-top: var(--spacing-s);
    }
</style>