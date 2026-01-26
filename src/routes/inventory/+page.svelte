<script>
    import CategoryTag from '$lib/components/CategoryTag.svelte';
    import CategoryIcon from '$lib/components/CategoryIcon.svelte';
    
    let selectedCategory = $state('All');
  </script>
  
  <CategoryTag bind:activeCategory={selectedCategory} />
  <CategoryIcon bind:activeCategory={selectedCategory} />