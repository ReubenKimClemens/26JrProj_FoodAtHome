import * as databaseDump from '$lib/api/databaseDump.js';

export async function load({ locals }) {
    // Get user from session - adjust this based on your auth setup
    // For now using the hardcoded userId, but you should get this from your auth
    const userId = locals.user?.id || '5a9e584a-69a4-476d-8c23-d8d403b87bec';

    try {
        // Fetch all data in parallel
        const [budgets, receipts, receiptItems, shoppingLists, shoppingListItems, users] = await Promise.all([
            databaseDump.getAllBudgets(userId),
            databaseDump.getAllReceipts(userId),
            databaseDump.getAllItemsReceipts(userId),
            databaseDump.getAllShoppingLists(userId),
            databaseDump.getAllShoppingListItems(userId),
            databaseDump.getAllUsers(userId)
        ]);

        return {
            budgets,
            receipts,
            receiptItems,
            shoppingLists,
            shoppingListItems,
            users,
            userId
        };
    } catch (error) {
        console.error('Error loading database dump:', error);
        return {
            budgets: [],
            receipts: [],
            receiptItems: [],
            shoppingLists: [],
            shoppingListItems: [],
            users: [],
            userId,
            error: error.message
        };
    }
}