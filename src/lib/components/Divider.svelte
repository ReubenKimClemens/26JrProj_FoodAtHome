<script>
    let {
      variant = 'default',
      spacing = 'medium',
      color = undefined
    } = $props();
</script>
  
<hr 
    class="divider"
    style={color ? `border-color: ${color}` : ''}
    aria-orientation="horizontal"
/>
  
<style>
    .divider {
      width: 100%;
      height: 1px;
      border: none;
      border-top: 1px solid var(--border-primary, #737780);
      border-radius: 999px;
      margin: 16px 0;
    }
</style>