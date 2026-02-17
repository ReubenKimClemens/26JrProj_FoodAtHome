import { 
    getActiveBudget,
    getAllReceipts,
    getAllItemsFromUser
} from '$lib/api/receipts.js';
import { supabase } from '$lib/supabaseClient';

export async function load({ locals }) {
    const userId = locals.user?.id || '5a9e584a-69a4-476d-8c23-d8d403b87bec';
    
    const activeBudget = await getActiveBudget(userId);

    return {
        activeBudget
    };
}