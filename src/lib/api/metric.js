import { supabase } from '$lib/supabaseClient';
import { getCategoryColor } from '$lib/categoryColors.js';

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

// Get percentage share and total price for each category
export async function TopCategories(userId) {
    const { data, error } = await supabase
        .from('receipt_items')
        .select('category, unit_price')
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
            categoryMap[name] = { name, count: 0, amount: 0 };
        }
        categoryMap[name].count += 1;
        categoryMap[name].amount += item.unit_price || 0;
    });

    // Convert to array with percentage, sorted by total price descending
    return Object.values(categoryMap)
        .map((cat) => ({
            name: cat.name,
            percentage: totalItems > 0 ? parseFloat(((cat.count / totalItems) * 100).toFixed(1)) : 0,
            amount: cat.amount,
            color: getCategoryColor(cat.name).dark
        }))
        .sort((a, b) => b.amount - a.amount);
}

// Increment total_chomped in user_metric_data
export async function incrementChomped(userId) {
    const { data: existing } = await supabase
        .from('user_metric_data')
        .select('total_chomped')
        .eq('user_id', userId)
        .maybeSingle();

    if (existing) {
        const { error } = await supabase
            .from('user_metric_data')
            .update({ total_chomped: (existing.total_chomped || 0) + 1 })
            .eq('user_id', userId);
        if (error) console.error('Error updating total_chomped:', error);
    } else {
        const { error } = await supabase
            .from('user_metric_data')
            .insert({ user_id: userId, total_chomped: 1, total_tossed: 0 });
        if (error) console.error('Error inserting total_chomped:', error);
    }
}

// Increment total_tossed in user_metric_data
export async function incrementTossed(userId) {
    const { data: existing } = await supabase
        .from('user_metric_data')
        .select('total_tossed')
        .eq('user_id', userId)
        .maybeSingle();

    if (existing) {
        const { error } = await supabase
            .from('user_metric_data')
            .update({ total_tossed: (existing.total_tossed || 0) + 1 })
            .eq('user_id', userId);
        if (error) console.error('Error updating total_tossed:', error);
    } else {
        const { error } = await supabase
            .from('user_metric_data')
            .insert({ user_id: userId, total_tossed: 1, total_chomped: 0 });
        if (error) console.error('Error inserting total_tossed:', error);
    }
}