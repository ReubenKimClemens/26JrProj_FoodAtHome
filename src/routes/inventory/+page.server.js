import {getItemCategoryCount, getDaysSinceAdded, getAllShoppingLists, getActiveBudget, getAllReceiptIds, getOtherCategoriesCount, getAllItemsFromUser} from '$lib/api/receipts.js';

export async function load({ locals }) {
    const userId = locals.user?.id || '5a9e584a-69a4-476d-8c23-d8d403b87bec';

    const receiptIds = await getAllReceiptIds(userId);
    const shoppingLists = await getAllShoppingLists(userId);
    const activeBudget = await getActiveBudget(userId);
    const proteinCount = await getItemCategoryCount(userId, 'Protein');
    const otherCount = await getOtherCategoriesCount(userId);
    const allItems = await getAllItemsFromUser(userId);

    return {
        receiptIds,
        shoppingLists,
        activeBudget,
        proteinCount,
        otherCount,
        userId,
        allItems
    };
}