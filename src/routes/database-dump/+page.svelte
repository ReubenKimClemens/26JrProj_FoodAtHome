<script>
	let { data } = $props();

	function formatDate(date) {
		if (!date) return 'N/A';
		return new Date(date).toLocaleString();
	}
</script>

<div class="container">
	<h1>Database Dump</h1>

	<!-- Badges Table -->
	<section>
		<h2>Badges ({data.badges?.length || 0})</h2>
		{#if data.badges && data.badges.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.badges as badge}
						<tr>
							<td>{badge.id}</td>
							<td>{badge.name || 'N/A'}</td>
							<td>{badge.description || 'N/A'}</td>
							<td>{formatDate(badge.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No badges found</p>
		{/if}
	</section>

	<!-- Budgets Table -->
	<section>
		<h2>Budgets ({data.budgets?.length || 0})</h2>
		{#if data.budgets && data.budgets.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>User ID</th>
						<th>Date</th>
						<th>Budget Amount</th>
						<th>Total Spent</th>
						<th>Active</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.budgets as budget}
						<tr>
							<td>{budget.id}</td>
							<td>{budget.user_id}</td>
							<td>{budget.date || 'N/A'}</td>
							<td>${budget.budget_amount || 0}</td>
							<td>${budget.total_spent || 0}</td>
							<td>{budget.active_budget ? '✓' : '✗'}</td>
							<td>{formatDate(budget.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No budgets found</p>
		{/if}
	</section>

	<!-- Receipts Table -->
	<section>
		<h2>Receipts ({data.receipts?.length || 0})</h2>
		{#if data.receipts && data.receipts.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>User ID</th>
						<th>Store Name</th>
						<th>Total Amount</th>
						<th>Purchased At</th>
						<th>Image URL</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.receipts as receipt}
						<tr>
							<td>{receipt.id}</td>
							<td>{receipt.user_id}</td>
							<td>{receipt.store_name || 'N/A'}</td>
							<td>${receipt.total_amount || 0}</td>
							<td>{formatDate(receipt.purchased_at)}</td>
							<td>{receipt.image_url || 'N/A'}</td>
							<td>{formatDate(receipt.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No receipts found</p>
		{/if}
	</section>

	<!-- Receipt Items Table -->
	<section>
		<h2>Receipt Items ({data.receiptItems?.length || 0})</h2>
		{#if data.receiptItems && data.receiptItems.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Receipt ID</th>
						<th>Item Name</th>
						<th>Quantity</th>
						<th>Unit Name</th>
						<th>Unit Price</th>
						<th>Total Price</th>
						<th>Category</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.receiptItems as item}
						<tr>
							<td>{item.id}</td>
							<td>{item.receipt_id}</td>
							<td>{item.item_name || 'N/A'}</td>
							<td>{item.quantity || 0}</td>
							<td>{item.unit_name || 'N/A'}</td>
							<td>${item.unit_price || 0}</td>
							<td>${item.total_price || 0}</td>
							<td>{item.category || 'N/A'}</td>
							<td>{formatDate(item.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No receipt items found</p>
		{/if}
	</section>

	<!-- Shopping Lists Table -->
	<section>
		<h2>Shopping Lists ({data.shoppingLists?.length || 0})</h2>
		{#if data.shoppingLists && data.shoppingLists.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>User ID</th>
						<th>List Name</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.shoppingLists as list}
						<tr>
							<td>{list.id}</td>
							<td>{list.user_id}</td>
							<td>{list.list_name || 'N/A'}</td>
							<td>{formatDate(list.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No shopping lists found</p>
		{/if}
	</section>

	<!-- Shopping List Items Table -->
	<section>
		<h2>Shopping List Items ({data.shoppingListItems?.length || 0})</h2>
		{#if data.shoppingListItems && data.shoppingListItems.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Shopping List ID</th>
						<th>Item Name</th>
						<th>Checked</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.shoppingListItems as item}
						<tr>
							<td>{item.id}</td>
							<td>{item.shopping_list_id}</td>
							<td>{item.item_name || 'N/A'}</td>
							<td>{item.is_checked ? '✓' : '✗'}</td>
							<td>{formatDate(item.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No shopping list items found</p>
		{/if}
	</section>

	<!-- Users Table -->
	<section>
		<h2>Users ({data.users?.length || 0})</h2>
		{#if data.users && data.users.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Auth ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.users as user}
						<tr>
							<td>{user.id}</td>
							<td>{user.auth_id || 'N/A'}</td>
							<td>{user.name || 'N/A'}</td>
							<td>{user.email || 'N/A'}</td>
							<td>{formatDate(user.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No users found</p>
		{/if}
	</section>
</div>

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 20px;
	}

	th, td {
		padding: 8px;
		border: 1px solid #ddd;
		text-align: left;
	}

	th {
		background: #f5f5f5;
	}

	p {
		color: #666;
		font-style: italic;
	}
</style>