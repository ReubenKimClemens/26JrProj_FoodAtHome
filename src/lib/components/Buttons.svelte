<script>
  export let variant = "primary"; // "primary" | "secondary" | "outline" | "danger"
  export let size = "md";         // "md" | "lg"
  export let block = false;       // full width
  export let type = "button";
</script>

<button
  {type}
  class={`btn btn-${variant} btn-${size} ${block ? "btn-block" : ""} title-sm`}
  on:click
>
  <slot>Button</slot>
</button>

<style>
  .btn{
    border: 1px solid transparent;
    border-radius: var(--radius-rounded);
    box-shadow: var(--shadow);
    background: var(--bg);
    cursor: pointer;

  }

  /* sizes */
  .btn-md{ 
    height: 40px; 
    padding: var(--spacing-none) var(--spacing-s); 
  }

  .btn-lg{ 
    height: 44px; 
    padding: 8px 16px; 
    font-size: 16px; 
    min-width: 370px; }

  .btn-block{ 
    width: 100%; 
    min-width: 0; }

  /* variants */
  .btn-primary{
    background: var(--bg-brand-primary);
    color: var(--text-on-action);
  }

  .btn-secondary{
    background: var(--bg-page-secondary);
    color: var(--text-brand-primary);
  }

  .btn-outline{
    background: var(--bg-page-secondary);
    color: var(--text-brand-primary);
    border-color: var(--text-brand-primary);
  }

  .btn-danger{
    background: var(--bg-page-secondary);
    color: var(--text-danger);
  }
</style>
