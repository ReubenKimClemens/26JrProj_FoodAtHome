<script>
    import GroceryItemCard from '$lib/components/GroceryItemCard.svelte';

    let { groceryItems = [] } = $props();

    function handleChange(itemId, newChecked) {
        const item = groceryItems.find(i => i.id === itemId);
    }
</script>

<div class="list">
    {#each groceryItems as item (item.id)}
        <GroceryItemCard 
            {...item}
            onchange={(e) => handleChange(item.id, e.detail.checked)}
        />
    {/each}
</div>