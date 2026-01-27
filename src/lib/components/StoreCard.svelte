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
            <h3 class="store-name">{storeName}</h3>
            -
            <span class="date">{date}</span>
        </div>
         <div class="item-count">
            {items} items
        </div>
    </div>
    <span class="price">${price}</span>
</div>
  
<style>
    .item-card {
        background: var(--bg-page-secondary);
        border-radius: var(--radius-rounded);
        padding: 20px 24px;
        box-shadow: var(--box-shadow);
        color: var(--text-default);
        font-family: var(--font-body);
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
    .top-info {
        align-items: center;
        gap: 4px;
        display: flex;
    }
    .date {
        color: var(--text-secondary, #737780);
        font-weight: 500;
    }

  
    .store-name {
        font-size: 20px;
        margin: 0;
    }
  
    .item-count {
        padding: 4px 12px;
        width: fit-content;
        border-radius: var(--radius-full);
        font-weight: bold;
        font-size: var(--font-body-sm-size);
        background: #F6F2FB;
        color: #A07AD9;
    }
  
    .price {
        font-size: var(--font-title-md-size);
        font-weight: bold;
    }
</style>