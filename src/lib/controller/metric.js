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
        .from('receipts')
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

// Get count and total price for each category
export async function TopCategories(userId) {
    const { data, error } = await supabase
        .from('receipt_items')
        .select('category, total_price')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching category breakdown:', error);
        return null;
    }

    const categoryMap = {};
    const totalItems = data.length;

    data.forEach((item) => {
        const name = item.category || 'Uncategorized';
        if (!categoryMap[name]) {
            categoryMap[name] = { name, count: 0, totalPrice: 0 };
        }
        categoryMap[name].count += 1;
        categoryMap[name].totalPrice += item.total_price || 0;
    });

    return Object.values(categoryMap)
        .map((cat) => ({
            name: cat.name,
            percentage: totalItems > 0 ? parseFloat(((cat.count / totalItems) * 100).toFixed(1)) : 0,
            totalPrice: cat.totalPrice
        }))
        .sort((a, b) => b.totalPrice - a.totalPrice);
}