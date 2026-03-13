<script>
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InventoryItemCard from '$lib/components/InventoryItemCard.svelte';
    import { MoveLeft } from 'lucide-svelte';
    import { goto } from '$app/navigation';

    let { data } = $props();
    let deletedItems = $state([...data.deletedItems]);

    function handleRestore(itemId) {
        deletedItems = deletedItems.filter(item => item.id !== itemId);
    }

    function handlePermanentDelete(itemId) {
        deletedItems = deletedItems.filter(item => item.id !== itemId);
    }
</script>

<div class="content">
    <div class="top-nav">
        <button class="icon-btn" onclick={() => goto('/inventory')}>
            <MoveLeft/>
        </button>

        <span class="title title-lg">Recently Deleted</span>
    </div>

    <p class="subtitle">Items are permanently deleted after 30 days.</p>

    {#if deletedItems.length === 0}
        <div class="empty">
            <p>No recently deleted items.</p>
        </div>
    {:else}
        <div class="item-list">
            {#each deletedItems as item (item.id)}
                <div class="deleted-row">
                    <div class="card-wrapper">
                        <InventoryItemCard
                            itemName={item.item_name}
                            quantity={item.quantity}
                            category={item.category || 'Uncategorized'}
                            addedDaysAgo={item.days_since_deleted}
                        />
                    </div>
                    <div class="actions">
                        <button class="restore-btn" onclick={() => handleRestore(item.id)}>
                            Restore
                        </button>
                        <button class="delete-btn" onclick={() => handlePermanentDelete(item.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .icon-btn {
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        background: none;
        border: none;
        padding: 0;
    }

    .content {
        height: calc(100vh - 96px);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
    }
    
    .top-nav {
        width: 100%;
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        align-items: center;
    }

    .top-nav .title {
        justify-self: center;
        text-align: center;
    }

    .subtitle {
        font-size: 0.8rem;
        font-family: 'Nunito', sans-serif;
        color: var(--text-secondary, #737780);
    }

    .empty {
        text-align: center;
        color: var(--text-secondary, #737780);
        font-family: 'Nunito', sans-serif;
        margin-top: 4rem;
    }
</style>