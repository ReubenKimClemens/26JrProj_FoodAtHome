<script>
    import CategoryTag from '$lib/components/CategoryTag.svelte';
    
    let selectedCategory = $state('All');
  </script>
  
  <CategoryTag bind:activeCategory={selectedCategory} />