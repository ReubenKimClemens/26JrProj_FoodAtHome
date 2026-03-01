import { supabase } from '$lib/supabaseClient';

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
  return diffInDays;
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
