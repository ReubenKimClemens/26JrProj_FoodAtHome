<script>
    import Input from '$lib/components/InputField.svelte';
    import SectionCard from '$lib/components/SectionCard.svelte';
    import ProgressBar from '$lib/components/ProgressBar.svelte';
    import Divider from '$lib/components/Divider.svelte';
    // let username = $state('');
    // let searchQuery = $state('');
    // let products = $state([]);
    // let loading = $state(false);
    // let error = $state('');
    // let totalCost = $state(0);


    // // 🔒 Maria's Spoonacular API Key 
    // const API_KEY = 'cc2b7b342d844860a154f02ad7e4ca81';
    // const API_BASE = 'https://api.spoonacular.com/food/products/search';

    // async function searchGroceries() {
    //     // ✅ Validate
    //     if (!searchQuery.trim()) {
    //         error = 'Please enter a search term.';
    //         products = [];
    //         return;
    //     }
        
    //     // 🔁 Reset
    //     loading = true;
    //     error = '';
    //     products = [];
    //     totalCost = 0;

    //     try {
    //         // ☎️ Call API ---
    //         const encodedQuery = encodeURIComponent(searchQuery);
    //         const url = `${API_BASE}?query=${encodedQuery}&number=10&apiKey=${API_KEY}`;
            
    //         const response = await fetch(url);

    //         // ⌨️ Handle any HTTP errors
    //         if (!response.ok) {
    //             throw new Error(`API Error: HTTP Status ${response.status} - ${response.statusText}.`);
    //         }

    //         const data = await response.json();
            
    //         // 🤔 Process Data
    //         if (data.products && data.products.length > 0) {
    //             products = data.products.map(product => {
    //                 const mockPrice = Math.floor(Math.random() * 300) / 100 + 0.99; // $0.99 to $3.99
    //                 return {
    //                     id: product.id,
    //                     title: product.title,
    //                     image: product.image,
    //                     price: mockPrice
    //                 };
    //             });
                
    //             totalCost = products.reduce((sum, p) => sum + p.price, 0);
                
    //         } else {
    //             error = `No products found for "${searchQuery}". Try something more general!`;
    //         }

    //     } catch (e) {
    //         // ❌ Handle any errors
    //         console.error('Search failed:', e);
    //         error = `Failed to fetch data. ${e instanceof Error ? e.message : 'An unknown error occurred.'}`;
    //         products = [];
    //     } finally {
    //         loading = false;
    //     }
    // }
</script>
<!-- <div class="page-content">
    <header>
        <h1>Food at Home [TEST]</h1>
        <p class="app-description">The Food At Home app helps young adults, especially students, become more mindful of their grocery spending through small easy steps.</p>
    </header>

    <div class="search-controls">
        <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search for an ingredient (like eggs, ramen, rice...)"
            onkeydown={(e) => { if (e.key === 'Enter') searchGroceries(); }}
            aria-label="Search Query"
        />
        <button
            onclick={searchGroceries}
            disabled={loading || !searchQuery.trim()}
        >
            {#if loading}
                Searching... 
            {:else}
                Search
            {/if}
        </button>
    </div>

    <hr />

    {#if error}
        <p class="status-message error-message">Oops! {error}</p>
    {:else if loading}
        <p class="status-message loading-message">Looking up prices for "{searchQuery}"...</p>
    {/if}

    {#if products.length > 0}
        <section class="results-container">
            <div class="summary-bar">
                <h3>Found {products.length} Items</h3>
                <p class="total-cost">Estimated Total: ${totalCost.toFixed(2)}</p>
            </div>

            <ul class="product-list">
                {#each products as product (product.id)}
                    <li class="product-item">
                        <img src={product.image} alt={product.title} class="product-image"/>
                        <div class="product-info">
                            <h4>{product.title}</h4>
                        </div>
                        <p class="item-price">${product.price.toFixed(2)}</p>
                    </li>
                {/each}
            </ul>
        </section>
    {/if}
</div> -->

<Input 
label="Label" 
placeholder="Value"
/>

<div class="page-container">
    <SectionCard 
      title="Recently Added" 
      linkText="See All" 
      linkHref="/inventory?sort=recent"
    >
      {#snippet children()}
        {#each recentItems as item}
          <div class="list-item">
            <div>
              <div class="item-title">{item.name}</div>
              <div class="item-meta">{item.category} · {item.added}</div>
            </div>
          </div>
        {/each}
      {/snippet}
    </SectionCard>
  </div>
  
  <Divider />
  
  <ProgressBar value={25} max={100} />

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
        margin: 24px auto;
        
  }

    /* .page-content {
        padding: 25px;
        padding-bottom: 80px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    header h1 {
        color: #567766;
        font-size: 1.8rem;
    }

    .app-description {
        color: #0B1B13;
        font-style: italic;
        margin-bottom: 20px;
    }

    .search-controls {
        display: flex;
        gap: 10px;
    }

    input {
        flex-grow: 1;
        padding: 12px;
        border: 1px solid #567766;
        border-radius: 8px;
    }

    button {
        padding: 12px 20px;
        background-color: #0C8CE9;
        color: #FFFBF0;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.2s;
    }

    button:hover:not(:disabled) {
        background-color: #218838;
    }

    button:disabled {
        background-color: #e0e0e0;
    }

    hr {
        border: 0;
        height: 1px;
        background-color: #F2F2F4;
        margin: 20px 0;
    }

    .summary-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 2px solid #F316B0;
        margin-bottom: 15px;
    }

    .total-cost {
        font-size: 1.5em;
        color: #0B1B13;
        font-weight: bold;
        background-color: #FFFBF0;
        padding: 5px 10px;
        border-radius: 4px;
    }

    .product-list {
        list-style: none;
        padding: 0;
    }

    .product-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #F316B0;
    }

    .product-image {
        width: 50px;
        height: 50px;
        object-fit: contain;
        border-radius: 4px;
        margin-right: 15px;
        flex-shrink: 0;
    }

    .product-info {
        flex-grow: 1;
    }

    .product-info h4 {
        margin: 0;
        font-size: 1rem;
        color: #7E57C2;
    }

    .item-price {
        font-size: 1rem;
        color: #0B1B13;
        font-weight: bold;
        flex-shrink: 0;
        width: 80px;
        text-align: right;
    }

    .status-message {
        padding: 10px;
        border-radius: 8px;
        margin-top: 15px;
        font-weight: bold;
    }

    .error-message {
        background-color: #F68523;
        color: #FFFBF0;
        border: 1px solid #EA3729;
    }

    .loading-message {
        background-color: #50CC8B;
        color: #FFFBF0;
        border: 1px solid #008F5D;
    } --> */
</style>