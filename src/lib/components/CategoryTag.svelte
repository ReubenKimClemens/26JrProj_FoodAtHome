<script>
    import { getCategoryColor } from '$lib/categoryColors.js';

    let {
      categories = [
        'All', 'Produce', 'Protein', 'Wheat', 'Dairy', 
        'Drinks', 'Snacks', 'Pantry', 'Sauces', 'Spices',
        'Leftover', 'Frozen', 'Misc'
      ],
      activeCategory = $bindable('All')
    } = $props();

    // 🖱️When user clicks a category icon, update to its active color
    function handleCategoryClick(category) {
    activeCategory = category;
    }
</script>

<!-- 📱Scrollable container of category icons -->
<div class="category-tags-container">
    {#each categories as category}
      <button
        class="category-tag"
        class:active={activeCategory === category}
        style="
          --bg-color: {activeCategory === category 
            ? getCategoryColor(category).dark
            : getCategoryColor(category).light};
          --text-color: {activeCategory === category 
            ? getCategoryColor(category).light
            : getCategoryColor(category).dark};
        "
        onclick={() => handleCategoryClick(category)}
        aria-label="Filter by {category}"
        aria-pressed={activeCategory === category}
      >
        {category}
      </button>
    {/each}
</div>
  
<style>
    .category-tags-container {
      display: flex;
      gap: 16px;
      padding: 16px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  
    .category-tags-container::-webkit-scrollbar {
      display: none;
    }
  
    .category-tag {
      padding: 4px 8px;
      background: var(--bg-color);
      border-radius: 360px;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      font-size: 14px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      line-height: 16px;
      color: var(--text-color);
      flex-shrink: 0;
    }
</style>
