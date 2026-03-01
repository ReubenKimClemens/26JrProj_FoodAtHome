import { supabase } from '$lib/supabaseClient';

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