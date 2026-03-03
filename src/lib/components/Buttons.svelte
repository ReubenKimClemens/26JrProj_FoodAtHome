<script>
  export let variant = "primary"; // "primary" | "secondary" | "outline" | "danger"
  export let size = "md";         // "md" | "lg"
  export let block = false;       // full width
  export let type = "button";
</script>

<button
  {type}
  class={`btn btn-${variant} btn-${size} ${block ? "btn-block" : ""} ${
    variant === "primary" ? "title-sm" : "body-md"
  }`}
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
    transition: background-color 0.15s ease, transform 0.1s ease;
  }

  .btn:active {
    transform: scale(0.97);
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

  .btn-primary:active {
    background: rgba(15, 163, 118, 0.9);
  }

  .btn-secondary{
    background: var(--bg-page-secondary);
    color: var(--text-brand-primary);
  }

  .btn-secondary:active {
    background: rgba(15, 163, 118, 0.1);
  }

  .btn-outline{
    background: var(--bg-page-secondary);
    color: var(--text-brand-primary);
    border-color: var(--text-brand-primary);
  }

  .btn-outline:active {
    background: rgba(15, 163, 118, 0.1);
  }

  .btn-danger{
    background: var(--bg-page-secondary);
    color: var(--text-danger);
  }

  .btn-danger:active {
    background: rgba(255, 64, 64, 0.1);
  }
</style>