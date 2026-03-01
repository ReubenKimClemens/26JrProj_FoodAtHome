<script>  
    let {
        storeName = "Costo-Oct",
        items = 10,
        date = "12/09/25",
        price = 4.19
    } = $props();
  
</script>
  
<div class="item-card">
    <div class="left-info">
        <div class="top-info">
            <span class="store-name body-md-bold">{storeName}</span>
            -
            <span class="date body-xsm">{date}</span>
        </div>

         <div class="item-count body-xsm-bold">
            {items} items
        </div>
    </div>
    <span class="price title-sm">${price.toFixed(2)}</span>
</div>
  
<style>
    .item-card {
        background: var(--bg-page-secondary);
        border-radius: var(--radius-rounded);
        padding: 16px 24px;
        box-shadow: var(--box-shadow);
        color: var(--text-default);
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
    .top-info {
        align-items: center;
        gap: 4px;
        display: flex;
    }

    .left-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .date {
        color: var(--text-secondary, #737780);
    }

  
    .store-name {
        margin: 0;
    }
  
    .item-count {
        padding: 4px 8px;
        width: fit-content;
        border-radius: var(--radius-full);
        background: #F6F2FB;
        color: #A07AD9;
    }
  
    .price {
        font-size: var(--font-title-md-size);
        font-weight: bold;
    }
</style>