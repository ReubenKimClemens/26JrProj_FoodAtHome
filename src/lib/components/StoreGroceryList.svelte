<script>
    import ShoppingLink from '$lib/components/ShoppingLink.svelte';

    let {
        groceryLists = [{groceryListName: "Costo-Oct", itemCount: 10}]
    } = $props();
</script>

<div class="grocery-list">
    {#each groceryLists as groceryList}
        <ShoppingLink 
            linkText={groceryList.groceryListName}
            itemCount={groceryList.itemCount}
        />
    {/each}
</div>