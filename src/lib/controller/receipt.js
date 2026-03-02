import { supabase } from '$lib/supabaseClient';

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