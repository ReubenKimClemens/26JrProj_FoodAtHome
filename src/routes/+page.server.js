import { 
    getItemCategoryCount, 
    getOtherCategoriesCount, 
    getShoppingListCount,  // ← Add this
    getTopShoppingLists, 
    getActiveBudget 
} from '$lib/api/receipts.js';
import { supabase } from '$lib/supabaseClient';

export async function load({ locals }) {
    const userId = locals.user?.id || '5a9e584a-69a4-476d-8c23-d8d403b87bec';
    
    // Get top 3 shopping lists
    const { data: topShopLists } = await supabase
        .from('shopping_list')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3);

    // Get counts
    const proteinCount = await getItemCategoryCount(userId, 'Protein');
    const otherCount = await getOtherCategoriesCount(userId);
    const activeBudget = await getActiveBudget(userId);
    
    // Add item counts to each shopping list
    const listsWithCounts = await Promise.all(
        (topShopLists || []).map(async (list) => ({
            ...list,
            itemCount: await getShoppingListCount(list.id)
        }))
    );

    return {
        proteinCount,
        otherCount,
        totalCount: proteinCount + otherCount,
        activeBudget,
        topShoppingLists: listsWithCounts  // ← Use this single variable
    };
}