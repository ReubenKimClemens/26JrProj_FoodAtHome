import { 
    getActiveBudget
} from '$lib/api/receipts.js';
import {
    NumberOfItems,
    NumberOfReceipts,
    TotalSpent,
    HighestReceiptCost,
    LowestReceiptCost
} from '$lib/api/metric.js';
import { supabase } from '$lib/supabaseClient';

export async function load({ locals }) {
    const userId = locals.user?.id || '5a9e584a-69a4-476d-8c23-d8d403b87bec';
    
    const activeBudget = await getActiveBudget(userId);
    const numberOfItems = await NumberOfItems(userId);
    const numberOfReceipts = await NumberOfReceipts(userId);
    const totalSpent = await TotalSpent(userId);
    const highestReceiptCost = await HighestReceiptCost(userId);
    const lowestReceiptCost = await LowestReceiptCost(userId);
    
    return {
        activeBudget, numberOfItems, numberOfReceipts, totalSpent, highestReceiptCost, lowestReceiptCost
    };
}