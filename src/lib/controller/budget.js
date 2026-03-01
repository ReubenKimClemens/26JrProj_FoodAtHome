import { supabase } from '$lib/supabaseClient';

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

/* update budget amount */
export async function updateBudgetAmount(budgetId, newAmount) {
  const { data, error } = await supabase
    .from('budgets')
    .update({ ['budget_amount']: newAmount})
    .eq('id', budgetId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

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
