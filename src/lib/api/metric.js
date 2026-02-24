import { supabase } from '$lib/supabaseClient';

/*
List of functions I need to create for the metric page:
- NumberOfItems: Get the total number of items in the database.
- NumberOfReceipts: Get the total number of receipts in the database.
- TotalSpent: Calculate the total price of items in the database.
- PriceCalculation: Calculate the price of month, week, day, year.
- HighestReceiptCost: Get the receipt with the highest total cost.
- LowestReceiptCost: Get the receipt with the lowest total cost.
- GetTopFiveCategories
    = Calculate on metrice page
*/

// Number of items in the database
export async function NumberOfItems(userId) {
    const { data, error } = await supabase
        .from('receipt_items')
        .select('*', { count: 'exact' })
        .eq('user_id', userId);
    if (error) {
        console.error('Error fetching number of items:', error);
        return null;
    }
    return data.length;
}

// Number of receipts in the database
export async function NumberOfReceipts(userId) {
    const { data, error } = await supabase
        .from('receipt_items')
        .select('*', { count: 'exact' })
        .eq('user_id', userId);
    if (error) {
        console.error('Error fetching number of receipts:', error);
        return null;
    }
    return data.length;
}

// Total spent on items in the database
export async function TotalSpent(userId) {
    const { data, error } = await supabase
    .from('receipts')
    .select('total_amount')
    .eq('user_id', userId);
    if (error) {
        console.error('Error fetching total spent:', error);
        return null;
    }
    const total = data.reduce((sum, item) => sum + item.total_amount, 0);
    return total;
}

// Get the receipt with the highest total cost
export async function HighestReceiptCost(userId) {
    const { data, error } = await supabase
    .from('receipts')
    .select('total_amount')
    .eq('user_id', userId)
    .order('total_amount', { ascending: false })
    .limit(1);
    if (error) {
        console.error('Error fetching highest receipt cost:', error);
        return null;
    }
    return data[0]?.total_amount || null;
}

// Get the receipt with the lowest total cost
export async function LowestReceiptCost(userId) {
    const { data, error } = await supabase
    .from('receipts')
    .select('total_amount')
    .eq('user_id', userId)
    .order('total_amount', { ascending: true }).limit(1);
    if (error) {
        console.error('Error fetching lowest receipt cost:', error);
        return null;
    }
    return data[0]?.total_amount || null;
}