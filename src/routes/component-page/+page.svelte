<script>
    import Bag from '$lib/assets/achievements/bag.png';
    import Broccoli from '$lib/assets/achievements/broccoli.png';
    import Orange from '$lib/assets/achievements/orange.png';
    import Receipt from '$lib/assets/achievements/receipt.png';
    import Star from '$lib/assets/achievements/star.png';
    import Tomato from '$lib/assets/achievements/tomato.png';
    
    // achievements = [{achievementImage: Bag, achievementName: 'Do you have FAH?', achievementState: 'active'}, {achievementImage: Orange, achievementName: 'Wise Head', achievementState: 'inactive'}, {achievementImage: Star, achievementName: 'Getting Started', achievementState: 'active'},{achievementImage: Tomato, achievementName: 'First Item', achievementState: 'active'},{achievementImage: Receipt, achievementName: 'Receipt Warrior', achievementState: 'active'},{achievementImage: Broccoli, achievementName: 'Chomp Machine', achievementState: 'active'}]
    
    import ItemListCard from '$lib/components/InventoryItemCard.svelte';
    import GroceryListCard from '$lib/components/StoreCard.svelte';
    import EditDeleteItemCard from '$lib/components/EditDeleteItemCard.svelte';
    import GroceryItemCard from '$lib/components/GroceryItemCard.svelte';
    import InventoryContentCard from '$lib/components/InventoryContentCard.svelte';
    import AchievementItem from '$lib/components/AchievementItem.svelte';
    import AchievementGrid from '$lib/components/AchievementGrid.svelte';
    import ShoppingLink from '$lib/components/ShoppingLink.svelte';
    import StoreGroceryList from '$lib/components/StoreGroceryList.svelte';
    import ItemGroceryList from '$lib/components/ItemGroceryList.svelte';
    import InventoryList from '$lib/components/InventoryList.svelte';
    import SwipeableItem from '$lib/components/SwipeableItem.svelte';

    let allAchievements = [{img: Bag, name: 'Do you have FAH?', state: 'active'}, {img: Orange, name: 'Wise Head', state: 'inactive'}, {img: Star, name: 'Getting Started', state: 'active'},{img: Tomato, name: 'First Item', state: 'active'},{img: Receipt, name: 'Receipt Warrior', state: 'active'},{img: Broccoli, name: 'Chomp Machine', state: 'active'}];

    let inventoryItems = $state([
        { id: 1, itemName: '2% Milk', quantity: 1, category: 'Dairy', addedDaysAgo: 2 },
        { id: 2, itemName: 'Eggs', quantity: 12, category: 'Dairy', addedDaysAgo: 1 },
        { id: 3, itemName: 'Bananas', quantity: 6, category: 'Produce', addedDaysAgo: 0 }
    ]);

    let groceryItemsList = $state([
        { id: '1', label: '2% Milk', checked: false },
        { id: '2', label: 'Eggs', checked: true }
    ]);
    
    function handleDelete(itemId) {
        inventoryItems = inventoryItems.filter(item => item.id !== itemId);
    }
    
    function handleEdit(item) {
        console.log('Edit:', item);
        // Open edit modal or inline edit
    }
    let items = $state([
        { id: 1, itemName: '2% Milk', quantity: 1, category: 'Dairy', addedDaysAgo: 2 },
        { id: 2, itemName: 'Eggs', quantity: 12, category: 'Dairy', addedDaysAgo: 1 },
        { id: 3, itemName: 'Bread', quantity: 1, category: 'Bakery', addedDaysAgo: 3 },
        { id: 4, itemName: 'Bananas', quantity: 6, category: 'Produce', addedDaysAgo: 0 }
    ]);
    
    function removeItem(itemId) {
        items = items.filter(i => i.id !== itemId);
    }


    let myGroceryLists = [
        { label: "Costco-Oct", checked: false, id: "costco-oct" },
        { label: "Walmart-Nov", checked: true, id: "walmart-nov" },
        { label: "WholeFoods-Dec", checked: false, id: "wholefoods-dec" },
        { label: "Target-Jan", checked: false, id: "target-jan" }
    ];
    let isChecked = false;
  </script>

  <ItemListCard category="Dairy" quantity={4} itemName="Bananas" />

  <div class="gap"></div>
  <GroceryListCard storeName="Trader Joe's" items={8} date="12/09/25" price={4.19} />

  <div class="gap"></div>
  <EditDeleteItemCard category="Protein" quantity={1} itemName="Steak" price={15.99} />
  
  <div class="gap"></div>
  <GroceryItemCard 
    label="Buy milk"
    bind:checked={isChecked}
  />
  
  <div class="gap"></div>
  <InventoryContentCard />

  <div class="gap"></div>
  <AchievementItem />


  <div class="gap"></div>
  <AchievementGrid achievements={allAchievements} />
  <ShoppingLink/>

  <div class="gap"></div>
  <StoreGroceryList groceryLists = {[{groceryListName: "Costo-Oct", itemCount: 10}, {groceryListName: "Walmart-Nov", itemCount: 5}, {groceryListName: "WholeFoods-Dec", itemCount: 8}]} />

  <div class="gap"></div>
  <!-- Using with custom data -->
  <ItemGroceryList groceryItems={groceryItemsList} />

  <div class="gap"></div>
  <InventoryList />

  <div class="gap"></div>
  {#each items as item (item.id)}
  <SwipeableItem 
      itemName={item.itemName}
      quantity={item.quantity}
      category={item.category}
      addedDaysAgo={item.addedDaysAgo}
      onToss={() => removeItem(item.id)}
      onChomp={() => removeItem(item.id)}
  />
{/each}


  <div class="gap"></div>
<style>
    .gap {
        padding-bottom: 100px;
    }
</style>