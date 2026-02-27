<script>
  import { Grid2X2, List } from 'lucide-svelte';
  let { view = $bindable('list') } = $props();
</script>

<div class="toggle-container">
        
  <button
    class:active={view === 'list'}
    onclick={() => view = 'list'}
  >
    <List size={30} />
  </button>

  <button
    class:active={view === 'grid'}
    onclick={() => view = 'grid'}
    >
    <Grid2X2 size={30} />
  </button>
</div>


<style>
  .toggle-container {
    display: flex;
    gap: 0.25rem;
  }


    button {
        background: var(--bg-page-secondary);
        border: none;
        color: var(--icons-default);
        cursor: pointer;
        padding: 0;

        width: 3rem;
        height: 3rem;
        box-shadow: var(--box-shadow);
        border-radius: var(--radius-minimal);

        align-items: center;
        display: flex;  
      justify-content: center;
    }

    .active  {
        background-color: var(--bg-brand-primary);
        color: var(--icons-tertiary);
    }

</style>
