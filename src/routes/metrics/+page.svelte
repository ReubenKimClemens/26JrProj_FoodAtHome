<script>
    import BudgetCheck from '$lib/components/BudgetCard.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import GroceryListCard from '$lib/components/StoreCard.svelte';
    import MetricData from '$lib/components/MetricData.svelte';
    import TopCategories from '$lib/components/TopCategories.svelte';
    import { getCategoryColor } from '$lib/categoryColors.js';
    import BarGraphDaily from '$lib/assets/alpha_metrics_daily.webp';
    import BarGraphWeekly from '$lib/assets/alpha_metrics_weekly.webp';
    import BarGraphMonthly from '$lib/assets/alpha_metrics_monthly.webp';
    import BarGraphYearly from '$lib/assets/alpha_metrics_yearly.webp';

    import MonthlyChart from '$lib/assets/metrics_monthly_budget.svg';
    import BudgetHistory from '$lib/assets/metrics_budget_history.svg';
    import AmountSpentPerDay from '$lib/assets/amount_spent_per_day_graph.svg'
    

    import { MoveLeft } from 'lucide-svelte';
    import { MoveRight } from 'lucide-svelte';
    import { ChevronLeft } from 'lucide-svelte';
    import { ChevronRight } from 'lucide-svelte';

    let selectedCategory = $state('All');

    const graphImages = {
        'Today': BarGraphDaily,
        'Yesterday': BarGraphDaily,
        'This Week': BarGraphWeekly,
        'This Month': BarGraphMonthly,
        'This Year': BarGraphYearly
    };

    // budget card
    let { data } = $props();

    let avgPerDay = data.totalSpent / 30;
    let avgPerReceipt = data.totalSpent / data.numberOfReceipts;

    let budget = $state(data.activeBudget?.budget_amount ?? 400);
    let spent = $state(data.activeBudget?.total_spent ?? 0);
    let remaining = $state(budget - spent);
    let percentage = $state(Math.round((spent / budget) * 100));

    // graph
    let currentGraph = $derived(graphImages[selectedCategory] || BarGraphDaily);

    // store visit
    let stores = $state([
        {name: "Trader Joe's", date: "12/09/2025", items: 8, price: 42.18},
        {name: "Walmart", date: "12/08/2025", items: 8, price: 27.40},
        {name: "Whole Foods", date: "12/06/2025", items: 5, price: 32.24},
        {name: "Costco", date: "12/04/2025", items: 10, price: 56.80}
    ]);

    let metrics = $state([
        // daily view only has these 2 info

        {title: "Total Items", count: data.numberOfItems},
        {title: "Total Receipts", count: data.numberOfReceipts},

        // for weekly, monthly & yearly
        {title: "Avg per day", amount: avgPerDay},
        {title: "Avg per Receipt", amount: avgPerReceipt},
        {title: "Highest Receipt", amount: data.highestReceiptCost, date: "12/04/2025"},
        {title: "Lowest Receipt", amount: data.lowestReceiptCost, date: "12/08/2025"}
    ]);

    let categories= $state([
        { name: 'Produce', amount: 50.76, percentage: 32, color: getCategoryColor('Produce').dark },
        { name: 'Protein', amount: 39.65, percentage: 25, color: getCategoryColor('Protein').dark },
        { name: 'Dairy', amount: 35.00, percentage: 22, color: getCategoryColor('Dairy').dark }
    ]);
</script>
<div class="metric-screen">
    <PageHeader title="Metrics" />        
    <div class="data">
        <div class="date">
            <button>
                <ChevronLeft/>
            </button>
            <span class="title-lg">December</span>
            <button>
                <ChevronRight/>
            </button>
        </div>
        
        <section class="summary">
            <span class="title-md">Summary</span>

            <BudgetCheck 
            budgetId={data.activeBudget?.id} 
            showTitle={false}
            {spent}
            bind:budget
            bind:remaining
            bind:percentage
            />
            
            <div class="metric-data-container">
                {#each metrics as metric}
                    <MetricData label={metric.title} amount={metric.amount} count={metric.count} date={metric.date} />
                {/each}
            </div>
    
            <!-- <img src={MonthlyChart} alt="Bar Graph Showing {MonthlyChart} Metrics" /> -->
        </section>

        <section class="budget-history">
            <span class="title-md">Amount Spent Per Day</span>
            <img src="{AmountSpentPerDay}" alt="Amount spent per day graph">
        </section>
    
        <section class="budget-history">
            <span class="title-md">Budget History</span>
            <img src={BudgetHistory} alt="Bar Graph Showing {BudgetHistory} Metrics" />
        </section>
    
        <section class="store-visit">
    
            <span class="title-md">Store Visits</span>
            <div class="store-list">
                {#each stores as store}
                    <GroceryListCard 
                        storeName={store.name}
                        items={store.items}
                        date={store.date}
                        price={store.price}
                />{/each}
            </div>
        </section>
    
        <section class="top-categories">
    
            <span class="title-md">Top Categories</span>
            <TopCategories categories={categories} />
        </section>
    </div>


</div>

<style>
    .metric-screen {
        display: flex;
        flex-direction: column;
        padding-bottom: 1rem;
        align-self: center;
        gap: 24px;
    }

    .date {
        display: flex;
        justify-content: space-between;
    }

    button {
        background: transparent;
        border: transparent;
        color: var(--icons-default);
        cursor: pointer;
    }

    .data {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .store-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .metric-data-container {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }

    section {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>