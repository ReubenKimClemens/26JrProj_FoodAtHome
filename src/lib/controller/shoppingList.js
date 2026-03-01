import { supabase } from '$lib/supabaseClient';

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
