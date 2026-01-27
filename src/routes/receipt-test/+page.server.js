// +page.server.js
import { getAllReceipts, getItemsFromReceipt } from '$lib/api/receipts';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // Replace with your test user ID
  const userId = '5a9e584a-69a4-476d-8c23-d8d403b87bec';

  try {
    // 1. Get all receipts for the user
    const receipts = await getAllReceipts(userId);

    // 2. Fetch items for each receipt
    const receiptItems = {};
    for (const receipt of receipts) {
      receiptItems[receipt.id] = await getItemsFromReceipt(receipt.id);
    }

    return {
      receipts,
      receiptItems
    };
  } catch (error) {
    console.error('Error fetching receipts:', error);
    return {
      receipts: [],
      receiptItems: {}
    };
  }
}
