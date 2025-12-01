<script lang="ts">
  export let data;
  let { receipts, receiptItems } = data;

  import { deleteReceipt, deleteReceiptItem, updateReceiptItem } from '$lib/api/receipts';
  let selectedReceiptId: string | null = null;

  // Show items for a specific receipt
  function selectReceipt(receiptId: string) {
    selectedReceiptId = receiptId;
  }

  async function handleDeleteReceipt(receiptId: string) {
    if (confirm('Are you sure you want to delete this receipt?')) {
      await deleteReceipt(receiptId);
      // Remove from local state
      receipts = receipts.filter(r => r.id !== receiptId);
      delete receiptItems[receiptId];
      if (selectedReceiptId === receiptId) selectedReceiptId = null;
    }
  }

  async function handleDeleteItem(itemId: string) {
    if (confirm('Delete this item?')) {
      await deleteReceiptItem(itemId);
      // Remove from local state
      if (selectedReceiptId) {
        receiptItems[selectedReceiptId] = receiptItems[selectedReceiptId].filter(i => i.id !== itemId);
      }
    }
  }

  async function handleUpdateItem(itemId: string, field: string, value: string | number) {
    const updatedItem = await updateReceiptItem(itemId, { [field]: value });
    // Update local state
    if (selectedReceiptId) {
      receiptItems[selectedReceiptId] = receiptItems[selectedReceiptId].map(i =>
        i.id === itemId ? updatedItem : i
      );
    }
  }
</script>

<style>
  .container { padding: 1rem; font-family: sans-serif; }
  .receipt, .item { border: 1px solid #ccc; padding: 0.5rem; margin-bottom: 0.5rem; border-radius: 4px; }
  .buttons { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
  input { padding: 0.2rem; width: 100px; }
</style>

<div class="container">
  <h1>User Receipts</h1>

  {#if receipts.length === 0}
    <p>No receipts found.</p>
  {/if}

  {#each receipts as receipt}
    <div class="receipt">
      <strong>{receipt.store_name}</strong> - {receipt.purchased_at}
      <div class="buttons">
        <button on:click={() => selectReceipt(receipt.id)}>View Items</button>
        <button on:click={() => handleDeleteReceipt(receipt.id)}>Delete Receipt</button>
      </div>
    </div>
  {/each}

  {#if selectedReceiptId && receiptItems[selectedReceiptId]?.length > 0}
  <h2>Items for Receipt {selectedReceiptId}</h2>
  {#each receiptItems[selectedReceiptId] as item}
    <div class="item">
      <strong>{item.item_name}</strong> - ${item.total_price}
      <div class="buttons">
        <button on:click={() => handleDeleteItem(item.id)}>Delete Item</button>
        <button on:click={() => {
          const newName = prompt('New name', item.item_name);
          if (newName) handleUpdateItem(item.id, 'item_name', newName);
        }}>Update Name</button>
        <button on:click={() => {
          const newPrice = parseFloat(prompt('New price', item.price));
          if (!isNaN(newPrice)) handleUpdateItem(item.id, 'total_price', newPrice);
        }}>Update Price</button>
      </div>
    </div>
  {/each}
{:else if selectedReceiptId}
  <p>No items found for this receipt.</p>
{/if}
</div>
