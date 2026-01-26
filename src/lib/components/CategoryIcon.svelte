<script>
    let {
      categories = [
        'All', 'Produce', 'Protein', 'Bread', 'Dairy', 
        'Drinks', 'Snacks', 'Pantry', 'Sauces', 'Spices',
        'Leftover', 'Frozen', 'Misc', 'Dessert'
      ],
      activeCategory = $bindable('All')
    } = $props();
    
    const categoryIcons = {
      'All': 'category_all',
      'Produce': 'category_produce',
      'Protein': 'category_protein',
      'Bread': 'category_wheat',
      'Dairy': 'category_dairy',
      'Drinks': 'category_drinks',
      'Snacks': 'category_snacks',
      'Pantry': 'category_pantry',
      'Sauces': 'category_sauces',
      'Spices': 'category_spices',
      'Leftover': 'category_leftover',
      'Frozen': 'category_frozen',
      'Misc': 'category_misc',
      'Dessert': 'category_dessert'
    };
    
    const categoryBgColors = {
      'All': '#E6FAF7',
      'Produce': '#FFE1CC',
      'Protein': '#FCE9E9',
      'Wheat': '#FFEFB0',
      'Dairy': '#EAEAFC',
      'Drinks': '#E6F3FF',
      'Snacks': '#E6F9FD',
      'Pantry': '#EFEEFE',
      'Sauces': '#FAEAFC',
      'Spices': '#FFE5E5',
      'Leftover': '#E6FAF7',
      'Frozen': '#B0DAFF',
      'Misc': '#DADBDD',
      'Dessert': '#FDEDF5'
    };
    
    function handleCategoryClick(category) {
      activeCategory = category;
    }
    
    function getIconPath(category, isActive) {
      const iconName = categoryIcons[category];
      const state = isActive ? 'active' : 'inactive';
      return `/src/lib/assets/${iconName}_${state}.svg`;
    }
</script>
  
<div class="category-icons-container">
    {#each categories as category}
      <button 
        class="category-icon"
        class:active={activeCategory === category}
        style="--bg-color: {activeCategory === category ? '#0FA376' : categoryBgColors[category]}"
        onclick={() => handleCategoryClick(category)}
        aria-label={category}
        aria-pressed={activeCategory === category}
      >
        <div class="icon-circle">
          <img 
            src={getIconPath(category, activeCategory === category)} 
            alt="" 
            class="icon" 
          />
        </div>
        <span class="label">{category}</span>
      </button>
    {/each}
</div>
  
<style>
    .category-icons-container {
      display: flex;
      gap: 16px;
      padding: 16px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  
    .category-icons-container::-webkit-scrollbar {
      display: none;
    }
  
    .category-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }
  
    .category-icon:active {
      transform: scale(0.95);
    }
  
    .label {
      color: var(--text-default, #444955);
      font-size: 12px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 16px;
      text-align: center;
    }
  
    .category-icon.active .label {
      font-weight: 700;
    }
</style>