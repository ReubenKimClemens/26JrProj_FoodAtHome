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
  <div class="count-badge"><span>{count}</span></div>      
  <CategoryIcon categories={[category]} activeCategory="" />
  <h3 class="food-name">{name}</h3>
  <p class="timestamp">{timeText}</p>
</div>
  
<style>
  .food-card {
      position: relative;
      background: var(--background-default-page-secondary, white);
      border-radius: 8px;
      padding: 16px 32px;
      text-align: center;
      box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
      font-family: 'Nunito', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
  }
  
    .count-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 24px;
      height: 24px;
      padding: 4px;
      background: var(--background-inverted-brand-secondary, #F6F2FB);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .count-badge span {
      color: var(--text-brand-secondary, #A07AD9);
      font-size: 14px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      line-height: 24px;
  }
  
  .food-name {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-default, #444955);
      margin: 0;
      text-transform: capitalize;
  }
  
  .timestamp {
      color: var(--text-secondary, #737780);
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      text-transform: capitalize;
  }
</style>