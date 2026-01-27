<script>
    let {
      categories = [
        'All', 'Produce', 'Protein', 'Wheat', 'Dairy', 
        'Drinks', 'Snacks', 'Pantry', 'Sauces', 'Spices',
        'Leftover', 'Frozen', 'Misc', 'Dessert'
      ],
      activeCategory = $bindable('All')
    } = $props();

    // 🎨Background colors for each category when NOT selected
    const categoryColors = {
      'All': { light: '#E7F6F1', dark: '#0FA376' },
      'Produce': { light: '#FFE1CC', dark: '#FF6B00' },
      'Protein': { light: '#FCE9E9', dark: '#DC2626' },
      'Wheat': { light: '#FFEFB0', dark: '#B59100' },
      'Dairy': { light: '#EAEAFC', dark: '#3030E0' },
      'Drinks': { light: '#E6F3FF', dark: '#3C82F6' },
      'Snacks': { light: '#E6F9FD', dark: '#00C0E8' },
      'Pantry': { light: '#EFEEFE', dark: '#6155F5' },
      'Sauces': { light: '#FAEAFC', dark: '#CB30E0' },
      'Spices': { light: '#FFE5E5', dark: '#FF0000' },
      'Leftover': { light: '#E6FAF7', dark: '#00C8B3' },
      'Frozen': { light: '#B0DAFF', dark: '#007CE8' },
      'Misc': { light: '#DADBDD', dark: '#444955' },
      'Dessert': { light: '#FDEDF5', dark: '#EC4899' }
    };

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
            ? categoryColors[category].dark 
            : categoryColors[category].light};
          --text-color: {activeCategory === category 
            ? categoryColors[category].light 
            : categoryColors[category].dark};
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