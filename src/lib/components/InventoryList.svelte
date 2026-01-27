<script>
    import InventoryItemCard from '$lib/components/InventoryItemCard.svelte';

    let {
        inventoryItems = [
            { itemName: '2% Milk', quantity: 1, category: 'Dairy', addedDaysAgo: 2},
            { itemName: 'Eggs', quantity: 12, category: 'Dairy', addedDaysAgo: 1}
        ]
    } = $props();
</script>

<div class="inventory-list">
    {#each inventoryItems as item}
        <InventoryItemCard {...item} />
    {/each}
</div>

<style>
    .inventory-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
</style>