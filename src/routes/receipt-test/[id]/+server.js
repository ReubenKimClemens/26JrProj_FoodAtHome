import { json } from '@sveltejs/kit';
import { getItemsFromReceipt } from '$lib/api/receipts';

export async function GET({ params }) {
	const { id } = params;

	try {
		const items = await getItemsFromReceipt(id);
		return json({ items });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
