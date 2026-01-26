<script>
    let {
      label = '',
      value = $bindable(''),
      placeholder = '',
      type = 'text',
      disabled = false,
      error = '',
      id = crypto.randomUUID(),
      required = false,
      ...restProps
    } = $props();
  </script>
  
  <div class="input-field">
    {#if label}
      <label for={id} class="label">
        {label}
        {#if required}
          <span class="required">*</span>
        {/if}
      </label>
    {/if}
    
    <input
      {id}
      bind:value
      {type}
      {placeholder}
      {disabled}
      {required}
      class="input"
      class:error={error}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : undefined}
      {...restProps}
    />
    
    {#if error}
      <span id="{id}-error" class="error-message">{error}</span>
    {/if}
  </div>
  
  <style>
    .input-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
  
    .label {
      color: var(--text-default, #444955);
      font-size: 16px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      line-height: 20px;
      text-decoration: underline;
    }
  
    .required {
      color: #DC2626;
      margin-left: 2px;
    }
  
    .input {
      min-width: 120px;
      padding: 12px 16px;
      background: var(--background-default-page-secondary, white);
      border: 1px solid var(--border-secondary, #DADBDD);
      border-radius: 8px;
      
      color: var(--text-default, #444955);
      font-size: 16px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 20px;
      
      transition: border-color 0.2s ease, outline 0.2s ease;
    }
  
    .input::placeholder {
      color: var(--text-secondary, #737780);
    }
  
    .input:focus {
      outline: 2px solid var(--icons-default-brand-primary, #0FA376);
      outline-offset: 0;
      border-color: transparent;
    }
  
    .input:disabled {
      background: #F3F4F6;
      cursor: not-allowed;
      opacity: 0.6;
    }
  
    .input.error {
      border-color: #DC2626;
    }
  
    .input.error:focus {
      outline-color: #DC2626;
    }
  
    .error-message {
      color: #DC2626;
      font-size: 14px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 16px;
    }
  </style>