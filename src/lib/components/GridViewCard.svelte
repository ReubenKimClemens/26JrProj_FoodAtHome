<script>
    import CategoryIcon from '$lib/components/CategoryIcon.svelte';

    let { 
      category = 'Protein',
      name = 'Chicken Thighs',
      daysAgo = 2,
      count = 1
    } = $props();
    
    let timeText = $derived(
      daysAgo === 0 ? 'Added Today' :
      daysAgo === 1 ? 'Added Yesterday' :
      `Added ${daysAgo} Days Ago`
    );
</script>

<div class="food-card">
    <div class="count-badge">{count}</div>      
    <div class="icon-circle">
        <CategoryIcon categories={[category]} />
    </div>
      
    <h3 class="food-name">{name}</h3>
    <div class="timestamp">{timeText}</div>
</div>
    
    <style>
    .food-card {
      position: relative;
      background: white;
      border-radius: 16px;
      padding: 24px 20px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      width: 150px;
      font-family: var(--font-body);
      pointer-events: none;
    }
    
    .count-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #e8e8e8;
      color: #666;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
    }
    
    .icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon {
      font-size: 32px;
    }
    
    .category {
      color: #888;
      font-size: 13px;
      margin-bottom: 4px;
    }
    
    .food-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }
    
    .timestamp {
      color: #aaa;
      font-size: 13px;
    }
    </style>