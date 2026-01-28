<script>
    let {
      text = 'Button',
      variant = 'primary',
      size = 'Lg',
      onclick = () => {},
      disabled = false,
      type = 'button',
      ...restProps
    } = $props();
  </script>
  
  <button
    class="button-wrapper"
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:lg={size === 'Lg'}
    class:md={size === 'Md'}
    {onclick}
    {disabled}
    {type}
    {...restProps}
  >
    <span class="button-text">{text}</span>
  </button>
  
  <style>
    .button-wrapper {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.2s, transform 0.2s;
    }
  
    .button-wrapper:hover:not(:disabled) {
      opacity: 0.9;
    }
  
    .button-wrapper:active:not(:disabled) {
      transform: scale(0.98);
    }
  
    .button-wrapper:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .button-wrapper.primary {
      background: var(--background-default-brand-primary, #0FA376);
      box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    }
  
    .button-wrapper.secondary {
      background: transparent;
      border: 2px solid var(--background-default-brand-primary, #0FA376);
    }
  
    .button-text {
      color: var(--text-on-action, white);
      font-size: 18px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      text-transform: capitalize;
      line-height: 24px;
      text-align: center;
    }
  
    .button-wrapper.secondary .button-text {
      color: var(--background-default-brand-primary, #0FA376);
    }
  </style>