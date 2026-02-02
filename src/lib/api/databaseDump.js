import { supabase } from '$lib/supabaseClient';

// Budget
export async function getAllBudgets(userId) {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', userId)
  
    if (error) throw new Error(error.message);
    return data;
}

// receipt items
export async function getAllItemsReceipts(userID) {
    const { data, error } = await supabase
      .from('receipt_items')
      .select('*')
      .eq('user_id', userID)
  
    if (error) throw new Error(error.message);
    return data;
}

// receipts
export async function getAllReceipts(userId) {
    const { data, error } = await supabase
      .from('receipts')
      .select('*')
      .eq('user_id', userId)
  
    if (error) throw new Error(error.message);
    return data;
}

// shopping lists
export async function getAllShoppingLists(userId) {
    const { data, error } = await supabase
      .from('shopping_list')
      .select('*')
      .eq('user_id', userId)
  
    if (error) throw new Error(error.message);
    return data;
}

// shopping list items - FIXED: renamed from duplicate getAllShoppingLists
export async function getAllShoppingListItems(userId) {
    const { data, error } = await supabase
      .from('shopping_list_items')
      .select('*')
      .eq('user_id', userId)
  
    if (error) throw new Error(error.message);
    return data;
}

// users - FIXED: changed table name from 'users' to 'user'
export async function getAllUsers(userId) {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
  
    if (error) throw new Error(error.message);
    return data;
}