<script>
  import PageHeader from '$lib/components/PageHeader.svelte';
  import BudgetCheck from '$lib/components/BudgetCheck.svelte';
  import SectionCard from '$lib/components/SectionCard.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import ChevronRight from '$lib/assets/chevron-right.svg'

  let inventoryData = $state({
        total: 10,
        protein: 3,
        others: 7
  });

  let shoppingLists = $state([
        { name: 'Costco-Oct', itemCount: 10 },
        { name: "Trader Joe's", itemCount: 12 },
        { name: 'Wegmans', itemCount: 4 }
  ]);
</script>

<!-- Good Morning/Afternoon/Evening Cronch! -->
<PageHeader userName="Cronch" />

<!-- Budget Check Component -->
<BudgetCheck />

<!-- Inventory -->
<SectionCard title="inventory" linkText="View all" linkHref="/inventory">
  {#snippet content()}
      <div class="inventory-content">
          <div class="inventory-row">
              <span class="total-label">total Items</span>
              <span class="total-value">{inventoryData.total}</span>
          </div>
          <div class="inventory-row">
              <span class="item-label">Protein</span>
              <span class="item-value">{inventoryData.protein}</span>
          </div>
          <div class="inventory-row">
              <span class="item-label">Others</span>
              <span class="item-value">{inventoryData.others}</span>
          </div>
      </div>
  {/snippet}
</SectionCard>

<!-- Shopping Lists -->
<SectionCard title="shopping lists" linkText="View all" linkHref="/shopping-lists">
  {#snippet content()}
      <div class="shopping-lists-content">
          {#each shoppingLists as list, index}
              <a href="/shopping-lists" class="shopping-list-item">
                  <div class="list-info">
                      <span class="list-name">{list.name}</span>
                      <div class="item-count-tag">
                          <span class="count-number">{list.itemCount}</span>
                          <span class="count-text">items</span>
                      </div>
                  </div>
                  <img src={ChevronRight} alt="" class="chevron-icon" />
              </a>
              {#if index < shoppingLists.length - 1}
                  <Divider />
              {/if}
          {/each}
      </div>
  {/snippet}
</SectionCard>

<style>
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

.total-label {
  color: var(--text-brand-secondary, #A07AD9);
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
}

.total-value {
  color: var(--text-brand-secondary, #A07AD9);
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
}

.item-label {
  color: var(--text-secondary, #737780);
  font-size: 16px;
  font-family: Nunito;
  font-weight: 500;
  text-transform: capitalize;
}

.item-value {
  color: var(--text-secondary, #737780);
  font-size: 16px;
  font-family: Nunito;
  font-weight: 400;
  text-transform: capitalize;
}

/* Shopping Lists */
.shopping-lists-content {
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
}
</style>