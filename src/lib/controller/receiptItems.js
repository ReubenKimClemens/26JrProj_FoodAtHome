import { supabase } from '$lib/supabaseClient';

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

/* add new receipt item */
export async function addReceiptItem(userId, itemData) {
  const { data, error } = await supabase
    .from('receipt_items')
    .insert({
      user_id: userId,
      item_name: itemData.itemName,
      quantity: itemData.quantity,
      unit_name: itemData.unit,
      unit_price: itemData.price ? parseFloat(itemData.price.replace(/[$,]/g, '')) : null,
      total_price: itemData.price && itemData.quantity 
        ? parseFloat(itemData.price.replace(/[$,]/g, '')) * itemData.quantity 
        : null,
      category: itemData.category,
      created_at: itemData.date || new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
/* edit receipt item */
export async function editReceiptItem(itemData) {
  const { data, error } = await supabase
    .from('receipt_items')
    .update({
      item_name: itemData.itemName,
      quantity: itemData.quantity,
      unit_name: itemData.unit,
      unit_price: itemData.price ? parseFloat(itemData.price.replace(/[$,]/g, '')) : null,
      total_price: itemData.price && itemData.quantity 
        ? parseFloat(itemData.price.replace(/[$,]/g, '')) * itemData.quantity 
        : null,
      category: itemData.category
    })
    .eq('id', itemData.id)
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