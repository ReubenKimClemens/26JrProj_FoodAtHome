import { supabase } from '$lib/supabaseClient';

/* Get all receipts from user */
export async function getReceipts(userId) {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .eq('user_id', userId)
    .order('purchased_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

/* Get all items from a specific receipt  */
export async function getReceiptItems(receiptId) {
  const { data, error } = await supabase
    .from('receipt_items')
    .select('*')
    .eq('receipt_id', receiptId);

  if (error) throw new Error(error.message);
  return data;
}

/** Get a specific receipt */
export async function getReceipt(receiptId) {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .eq('id', receiptId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Delete an entire receipt */
export async function deleteReceipt(receiptId) {
  const { error } = await supabase
    .from('receipts')
    .delete()
    .eq('id', receiptId);

  if (error) throw new Error(error.message);
  return true;
}

/** Delete one item from a receipt */
export async function deleteReceiptItem(itemId) {
  const { error } = await supabase
    .from('receipt_items')
    .delete()
    .eq('id', itemId);

  if (error) throw new Error(error.message);
  return true;
}

/** Update one item on the receipt */
export async function updateReceiptItem(itemId, updates) {
  const { data, error } = await supabase
    .from('receipt_items')
    .update(updates)
    .eq('id', itemId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}