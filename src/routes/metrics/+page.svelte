<script>
    import Dropdown from '$lib/components/Dropdown.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import GroceryListCard from '$lib/components/StoreCard.svelte';
    import MetricData from '$lib/components/MetricData.svelte';
    import TopCategories from '$lib/components/TopCategories.svelte';
    import BarGraphDaily from '$lib/assets/FAH_Alpha_Metricsscreen_Daily.webp';
    import BarGraphWeekly from '$lib/assets/FAH_Alpha_Metricsscreen_Weekly.webp';
    import BarGraphMonthly from '$lib/assets/FAH_Alpha_Metricsscreen_Monthly.webp';
    import BarGraphYearly from '$lib/assets/FAH_Alpha_Metricsscreen_Yearly.webp';

    let selectedCategory = $state('All');

    const graphImages = {
        'Today': BarGraphDaily,
        'Yesterday': BarGraphDaily,
        'This Week': BarGraphWeekly,
        'This Month': BarGraphMonthly,
        'This Year': BarGraphYearly
    };

    let currentGraph = $derived(graphImages[selectedCategory] || BarGraphDaily);

    let stores = $state([
        {name: "Trader Joe's", date: "12/09/2025", items: 8, price: 42.18},
        {name: "Walmart", date: "12/08/2025", items: 8, price: 27.40},
        {name: "Whole Foods", date: "12/06/2025", items: 5, price: 32.24},
        {name: "Costco", date: "12/04/2025", items: 10, price: 56.80}
    ]);
    let metrics = $state([
        {title: "Total Spent", amount: 158.62},
        {title: "Avg per Receipt", amount: 39.65},
        {title: "Number of Items", count: 29},
        {title: "Number of Receipts", count: 4},
        {title: "Highest Receipt", amount: 56.08, date: "12/04/2025"},
        {title: "Lowest Receipt", amount: 27.40, date: "12/08/2025"}
    ]);
    let categories= $state([
        { name: 'Produce', amount: 50.76, percentage: 32, color: '#EF4444' },
        { name: 'Protein', amount: 39.65, percentage: 25, color: '#EF4444' },
        { name: 'Dairy', amount: 35.00, percentage: 22, color: '#10B981' }
    ]);
</script>

<div class="metric-screen">
    <PageHeader title="Metrics" />
    <Dropdown bind:value={selectedCategory} 
        options={['Today', 'Yesterday', 'This Week', 'This Month', 'This Year']}
        placeholder="Daily" />
    <PageHeader title="December 03 - December 09" />

    <img src={currentGraph} alt="Bar Graph Showing {selectedCategory} Metrics" />

    <div class="metric-data-container">
        {#each metrics as metric}
            <MetricData label={metric.title} amount={metric.amount} count={metric.count} date={metric.date} />
        {/each}
    </div>

    <PageHeader title="Store Visits" />
    <div class="store-list">
        {#each stores as store}
            <GroceryListCard 
                storeName={store.name}
                items={store.items}
                date={store.date}
                price={store.price}
        />{/each}
    </div>

    <PageHeader title="Top Categories" />
    <TopCategories categories={categories} />
</div>

<style>
    .metric-screen {
        font-family: var(--font-family-title);
        padding-bottom: 7rem;
        align-self: center;
        gap: 1rem;
    }
    .store-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .metric-data-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: .5rem;
        margin-bottom: 2rem;
    }
</style>
