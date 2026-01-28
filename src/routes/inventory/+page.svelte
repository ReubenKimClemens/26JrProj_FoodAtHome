<script>
    import PageHeader from '$lib/components/PageHeader.svelte';
    import CategoryTag from '$lib/components/CategoryTag.svelte';
    import CategoryIcon from '$lib/components/CategoryIcon.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    
    let selectedCategory = $state('All');
  </script>
  
  <PageHeader title="Inventory" />
  <CategoryTag bind:activeCategory={selectedCategory} />
  <CategoryIcon bind:activeCategory={selectedCategory} />
  <Dropdown bind:value={selectedCategory} 
            options={['Newest First', 'Oldest First']}
            placeholder="Newest First" />