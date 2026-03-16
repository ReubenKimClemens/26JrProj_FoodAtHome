import { 
    getItemCategoryCount, 
    getOtherCategoriesCount, 
    getShoppingListCount,  
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

    // Get all category counts in parallel
    const [
        proteinCount,
        produceCount,
        breadCount,
        dairyCount,
        drinksCount,
        snacksCount,
        pantryCount,
        saucesCount,
        spicesCount,
        leftoverCount,
        frozenCount,
        miscCount,
        activeBudget
    ] = await Promise.all([
        getItemCategoryCount(userId, 'Protein'),
        getItemCategoryCount(userId, 'Produce'),
        getItemCategoryCount(userId, 'Wheat'),
        getItemCategoryCount(userId, 'Dairy'),
        getItemCategoryCount(userId, 'Drinks'),
        getItemCategoryCount(userId, 'Snacks'),
        getItemCategoryCount(userId, 'Pantry'),
        getItemCategoryCount(userId, 'Sauces'),
        getItemCategoryCount(userId, 'Spices'),
        getItemCategoryCount(userId, 'Leftover'),
        getItemCategoryCount(userId, 'Frozen'),
        getItemCategoryCount(userId, 'Misc'),
        getActiveBudget(userId)
    ]);

    const totalCount = proteinCount + produceCount + breadCount + dairyCount +
        drinksCount + snacksCount + pantryCount + saucesCount +
        spicesCount + leftoverCount + frozenCount + miscCount;

    // Add item counts to each shopping list
    const listsWithCounts = await Promise.all(
        (topShopLists || []).map(async (list) => ({
            ...list,
            itemCount: await getShoppingListCount(list.id)
        }))
    );

    return {
        proteinCount,
        produceCount,
        breadCount,
        dairyCount,
        drinksCount,
        snacksCount,
        pantryCount,
        saucesCount,
        spicesCount,
        leftoverCount,
        frozenCount,
        miscCount,
        totalCount,
        activeBudget,
        topShoppingLists: listsWithCounts
    };
}