<script>
    import PageHeader from '$lib/components/PageHeader.svelte';
    
    import BudgetCheck from '$lib/components/BudgetCard.svelte';
    import SectionCard from '$lib/components/SectionCard.svelte';
    import ProgressBar from '$lib/components/ProgressBar.svelte';
    import Divider from '$lib/components/Divider.svelte';
    import ChevronRight from '$lib/assets/chevron_right.svg'

    let { data } = $props();

    let budget = $state(data.activeBudget?.budget_amount ?? 400);
    let spent = $state(data.activeBudget?.total_spent ?? 0);
    let remaining = $state(budget - spent);
    let percentage = $state(Math.round((spent / budget) * 100));

    const inventoryRows = [
        { count: 'totalCount', label: 'Total Items', class: 'total-value' },
        { count: 'proteinCount', label: 'Protein' },
        { count: 'produceCount', label: 'Produce' },
        { count: 'breadCount', label: 'Bread' },
        { count: 'dairyCount', label: 'Dairy' },
        { count: 'drinksCount', label: 'Drinks' },
        { count: 'snacksCount', label: 'Snacks' },
        { count: 'pantryCount', label: 'Pantry' },
        { count: 'saucesCount', label: 'Sauces' },
        { count: 'spicesCount', label: 'Spices' },
        { count: 'leftoverCount', label: 'Leftover' },
        { count: 'frozenCount', label: 'Frozen' },
        { count: 'miscCount', label: 'Misc' },
        ]
</script>

<!-- Good Morning/Afternoon/Evening Cronch! -->
<PageHeader userName="Cronch" />

    <!-- content wrapper -->
    <section class="content">
        
        <!-- Budget Check Component -->
        <BudgetCheck 
        budgetId={data.activeBudget?.id} 
        {spent}
        bind:budget
        bind:remaining
        bind:percentage
        />
    
        <!-- Inventory -->
        <SectionCard title="inventory" linkText="View all" linkHref="/inventory">
        {#snippet content()}
            <div class="inventory-content">
                {#each inventoryRows as row}
                    <div class="inventory-row body-md{row.count === 'totalCount' ? '-bold' : ''}">
                        <span class="{row.count === 'totalCount' ? 'total-label' : 'item-label'}">{row.label}</span>
                        <span class="{row.count === 'totalCount' ? 'total-value' : 'item-value'}">{data[row.count]}</span>
                    </div>
                    <div class="line"></div>
                {/each}
                </div>
        {/snippet}
        </SectionCard>
    
        <!-- Shopping Lists -->
        <!-- <SectionCard title="shopping lists" linkText="View all" linkHref="/shopping-lists">
        {#snippet content()}
            <div class="shopping-lists-content">
                {#each data.topShoppingLists as list, index}
                    <a href="/shopping-lists" class="shopping-list-item">
                        <div class="list-info">
                            <span class="list-name">{list.list_name}</span>
                            <div class="item-count-tag">
                                <span class="count-number">{list.itemCount}</span>
                                <span class="count-text">items</span>
                            </div>
                        </div>
                        <img src={ChevronRight} alt="" class="chevron-icon" />
                    </a>
                    {#if index < data.topShoppingLists.length - 1}
                        <Divider />
                    {/if}
                {/each}
            </div>
        {/snippet}
        </SectionCard> -->
    </section>

<style>
.content {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
/* Inventory */
.inventory-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    }

.inventory-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

.total-label, .total-value {
    color: var(--text-brand-secondary, #A07AD9);
    text-transform: capitalize;
    }

.item-label, .item-value {
    color: var(--text-secondary, #737780);
    text-transform: capitalize;
    }

    .line {
        height: 1px;
        margin: 3px 0;
        background: var(--text-secondary);
        width: 100%;
    }
/* .more {
    justify-content: center;
    color: var(--text-brand-secondary);   

    a:visited {
        color: var(--text-brand-secondary);
    }
} */
/* Shopping Lists */
/* .shopping-lists-content {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.shopping-list-item {
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    text-decoration: none;
}

.list-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-name {
    color: var(--text-default, #444955);
    font-size: 18px;
    font-family: Quicksand;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 24px;
}

.item-count-tag {
    padding: 4px 8px;
    background: var(--background-inverted-brand-secondary, #F6F2FB);
    border-radius: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
}

.count-number {
    color: var(--text-brand-secondary, #A07AD9);
    font-size: 12px;
    font-family: Nunito;
    font-weight: 700;
    line-height: 16px;
    text-align: center;
}

.count-text {
    color: var(--text-brand-secondary, #A07AD9);
    font-size: 12px;
    font-family: Nunito;
    font-weight: 700;
    line-height: 16px;
    text-align: center;
}

.chevron-icon {
    width: 24px;
    height: 24px;
} */
</style>