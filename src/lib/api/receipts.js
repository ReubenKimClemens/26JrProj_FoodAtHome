import { supabase } from '$lib/supabaseClient';
//receipts.js
/*
 User
 Nothing Right now
*/

/*
 Receipts
 Get all receipts from a user //
 Get specific Receipt //
 Store name //
 Edit store name //
 Get store name //
 Total amount //
 Edit total amount //
 get total amount //
 Get all items related to receipt //
 Delete Receipt //
*/

/* Get all receipts from user/ */
export async function getAllReceipts(userId) {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .eq('user_id', userId)
    .order('purchased_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

/* Get a specific receipt/ */
export async function getReceipt(receiptId) {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .eq('id', receiptId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* Get all receipt id's from a user */
export async function getAllReceiptIds(userId) {
  const { data, error } = await supabase
    .from('receipts')
    .select('id')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data.map(item => item.id);
}

/* Delete an entire receipt/ */
export async function deleteReceipt(receiptId) {
  const { error } = await supabase
    .from('receipts')
    .delete()
    .eq('id', receiptId);

  if (error) throw new Error(error.message);
  return true;
}

/* Update receipts info */ 
export async function updateReceipt(receiptId, rField, rValue) {
  const { data, error } = await supabase
    .from('receipts')
    .update({ [rField]: rValue })
    .eq('id', receiptId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* Get all items from a specific receipt  */
export async function getItemsFromReceipt(receiptId) {
  const { data, error } = await supabase
    .from('receipt_items')
    .select('*')
    .eq('receipt_id', receiptId);
  if (error) throw new Error(error.message);
  return data;
}

/* Get all receipts items from a user */
export async function getAllItemsFromUser(userId) {
  const { data, error } = await supabase
    .from('receipt_items')
    .select('*')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data;
}

/* Calculate days since receipt item was added */
export function getDaysSinceAdded(date) {
  const currentDate = new Date();
  const addedDate = new Date(date);
  const diffInTime = currentDate - addedDate;
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  console.log('Days since added:', diffInDays);
  return diffInDays;
}

/*
 Receipt items
 Create function that takes in parameter of name of column for an a item and the correlating information needed for it
 Get X //
 Edit X //
 Get specific item //
 Delete Item //
 get by category //
*/

/* Edit receipt item */
export async function updateReceiptItem(receiptItemId, receiptItemField, receiptItemValue) {
  const { data, error } = await supabase
    .from('receipt_items')
    .update({ [receiptItemField]: receiptItemValue})
    .eq('id', receiptItemId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* Get all info of receipt item  */
export async function getReceiptItem(ReceiptItemId) {
  const { data, error } = await supabase
    .from('receipt_items')
    .select('*')
    .eq('id', ReceiptItemId);

  if (error) throw new Error(error.message);
  return data;
}

/* Delete one item from a receipt */
export async function deleteReceiptItem(itemId) {
  const { error } = await supabase
    .from('receipt_items')
    .delete()
    .eq('id', itemId);

  if (error) throw new Error(error.message);
  return true;
}

/* Get count from specific category group  */
export async function getItemCategoryCount(userId, category) {
  const { count, error } = await supabase
    .from('receipt_items')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('category', category);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

/* Get count from all other categories */
export async function getOtherCategoriesCount(userId) {
  const { count, error } = await supabase
    .from('receipt_items')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .neq('category', 'protein');

  if (error) throw new Error(error.message);
  return count ?? 0;
}

/* Get all receipt items from specific category  */
export async function getItemByCategory(userId, category) {
  const { data, error } = await supabase
    .from('receipt_items')
    .select('category')
    .eq('user_id', userId)
    .eq('category', category);

  if (error) throw new Error(error.message);
  return data;
}

/*
 shopping List
 Create a new shopping list
 Get all shopping lists
 Delete shopping list
*/

/* Create a new shopping list */
export async function createShoppingList(userId, listName) {
  const { data, error } = await supabase
    .from('shopping_list')
    .insert({
      user_id: userId,
      list_name: listName
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* Get all shopping lists */
export async function getAllShoppingLists(userId) {
  const { data, error } = await supabase
    .from('shopping_list')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

/* Get shopping list info */
export async function getShoppingListInfo(listId) {
  const { data, error } = await supabase
    .from('shopping_list')
    .select('*')
    .eq('id', listId)

  if (error) throw new Error(error.message);
  return data;
}

/* Get the top shopping lists */
export async function getTopShoppingLists(userId) {
  const { data, error } = await supabase
    .from('shopping_list')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) throw new Error(error.message);
  return data;
}

/* update shopping list name */
export async function updateShoppingListName(listId, listNewName) {
  const { data, error } = await supabase
    .from('shopping_list')
    .update({ ['list_name']: listNewName})
    .eq('id', listId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* Get shopping list item count */
export async function getShoppingListCount(listId) {
  const { count, error } = await supabase
    .from('shopping_list_items')
    .select('*', { count: 'exact', head: true })
    .eq('shopping_list_id', listId);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

/*
 Shopping list items
 Create shopping list item
 update shopping list item
 Delete shopping list item
*/
/* Create shopping list item */
export async function createShoppingListItem(shoppingListId, itemName, isChecked = false) {
  const { data, error } = await supabase
    .from('shopping_list_items')
    .insert({
      shopping_list_id: shoppingListId,
      item_name: itemName,
      is_checked: isChecked
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* update list item name */
export async function updateListItemName(listItemId, listItemNewName) {
  const { data, error } = await supabase
    .from('shopping_list')
    .update({ ['item_name']: listItemNewName})
    .eq('id', listItemId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* Delete a shopping list item */
export async function deleteShoppingListItem(itemId) {
  const { error } = await supabase
    .from('shopping_list_items')
    .delete()
    .eq('id', itemId);

  if (error) throw new Error(error.message);
  return true;
}

/*
 budget
 Get specific budget info
 Set budget to active/inactive
 update budget amount
*/

/* get specific budget */
export async function getSpecificBudget(budgetId) {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', budgetId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/* get active budget */
export async function getActiveBudget(userId) {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('user_id', userId)
    .eq('active_budget', true)
    .single();

  if (error) throw new Error(error.message);
  return data || null;
}