<script>
    let {
      variant = 'default', // 'default', 'thick', 'dashed', 'dotted'
      spacing = 'medium', // 'small', 'medium', 'large'
      color = undefined
    } = $props();
  </script>
  
  <hr 
    class="divider"
    class:variant-thick={variant === 'thick'}
    class:variant-dashed={variant === 'dashed'}
    class:variant-dotted={variant === 'dotted'}
    class:spacing-small={spacing === 'small'}
    class:spacing-large={spacing === 'large'}
    style={color ? `border-color: ${color}` : ''}
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
  
    .divider.spacing-small {
      margin: 8px 0;
    }
  
    .divider.spacing-large {
      margin: 24px 0;
    }
  
    .divider.variant-thick {
      height: 2px;
      border-top-width: 2px;
    }
  
    .divider.variant-dashed {
      border-top-style: dashed;
    }
  
    .divider.variant-dotted {
      border-top-style: dotted;
    }
  </style>