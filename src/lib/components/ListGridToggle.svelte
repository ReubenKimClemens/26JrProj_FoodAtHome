<script>
  import { Grid2X2, List } from 'lucide-svelte';
  let view = 'list';
</script>

<div class="content">
    <div class="toggle-container">
        
<button
  class:activeItem={view === 'list'}
  on:click={() => view = 'list'}
>
  <List size={30} />
</button>

<button
  class:activeItem={view === 'grid'}
  on:click={() => view = 'grid'}
>
  <Grid2X2 size={30} />
</button>
    </div>
</div>


<style>
    .content {
        background: lightgrey;
        height: 100vh;
        display: flex;
        justify-content: center;
        padding-top: 5rem;
        
    }


    button {
        background: var(--bg-page-secondary);
        border: none;
        color: var(--icons-default);
        cursor: pointer;
        padding: 0;

        width: 3rem;
        height: 3rem;
        box-shadow: var(--drop-shadow-for-navbar-200);
        border-radius: var(--radius-minimal);

        align-items: center;
      justify-content: center;
    }

    .activeItem {
        background-color: var(--bg-brand-primary);
        color: var(--icons-tertiary);
    }

</style>
