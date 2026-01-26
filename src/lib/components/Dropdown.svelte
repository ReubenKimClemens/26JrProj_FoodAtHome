<script>
    import ChevronDown from '$lib/assets/chevron_down.svg';
    
    let {
      label = '',
      value = $bindable(''),
      options = [],
      placeholder = 'Select an option',
      disabled = false,
      error = '',
      id = crypto.randomUUID(),
      required = false,
      ...restProps
    } = $props();
    
    let isOpen = $state(false);
    let dropdownRef = $state(null);
    
    const selectedOption = $derived(
      options.find(opt => 
        (typeof opt === 'object' ? opt.value : opt) === value
      )
    );
    
    const displayText = $derived(() => {
      if (!selectedOption) return placeholder;
      return typeof selectedOption === 'object' 
        ? selectedOption.label 
        : selectedOption;
    });
    
    function toggleDropdown() {
      if (!disabled) {
        isOpen = !isOpen;
      }
    }
    
    function selectOption(option) {
      value = typeof option === 'object' ? option.value : option;
      isOpen = false;
    }
    
    function handleClickOutside(event) {
      if (dropdownRef && !dropdownRef.contains(event.target)) {
        isOpen = false;
      }
    }
    
    function handleKeydown(event) {
      if (disabled) return;
      
      if (event.key === 'Escape') {
        isOpen = false;
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDropdown();
      }
    }
    
    $effect(() => {
      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
    });
  </script>
  
  <div class="dropdown-field" bind:this={dropdownRef}>
    {#if label}
      <label for={id} class="label">
        {label}
        {#if required}
          <span class="required">*</span>
        {/if}
      </label>
    {/if}
    
    <button
      type="button"
      {id}
      class="select"
      class:open={isOpen}
      class:error={error}
      class:has-value={value}
      onclick={toggleDropdown}
      onkeydown={handleKeydown}
      {disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-describedby={error ? `${id}-error` : undefined}
      {...restProps}
    >
      <span class="selected-text" class:placeholder={!value}>
        {displayText()}
      </span>
      
      <img 
        src={ChevronDown} 
        alt="" 
        class="chevron-icon"
        class:rotated={isOpen}
      />
    </button>
    
    {#if isOpen}
      <div class="options" role="listbox">
        {#each options as option}
          {@const optionValue = typeof option === 'object' ? option.value : option}
          {@const optionLabel = typeof option === 'object' ? option.label : option}
          
          <button
            type="button"
            class="option"
            class:selected={value === optionValue}
            onclick={() => selectOption(option)}
            role="option"
            aria-selected={value === optionValue}
          >
            {optionLabel}
          </button>
        {/each}
      </div>
    {/if}
    
    {#if error}
      <span id="{id}-error" class="error-message">{error}</span>
    {/if}
  </div>
  
  <style>
    .dropdown-field {
      position: relative;
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
    }
  
    .required {
      color: #DC2626;
      margin-left: 2px;
    }
  
    .select {
      width: 100%;
      min-width: 120px;
      padding: 12px 16px;
      background: var(--background-default-page-secondary, white);
      border: 1px solid var(--border-secondary, #DADBDD);
      border-radius: 8px;
      
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      
      cursor: pointer;
      transition: border-color 0.2s ease, outline 0.2s ease;
    }
  
    .select:hover:not(:disabled) {
      border-color: var(--icons-default-brand-primary, #0FA376);
    }
  
    .select:focus {
      outline: 2px solid var(--icons-default-brand-primary, #0FA376);
      outline-offset: 0;
      border-color: transparent;
    }
  
    .select:disabled {
      background: #F3F4F6;
      cursor: not-allowed;
      opacity: 0.6;
    }
  
    .select.error {
      border-color: #DC2626;
    }
  
    .select.error:focus {
      outline-color: #DC2626;
    }
  
    .selected-text {
      flex: 1;
      text-align: left;
      color: var(--text-default, #444955);
      font-size: 16px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 20px;
    }
  
    .selected-text.placeholder {
      color: var(--text-secondary, #737780);
    }
  
    .chevron-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }
  
    .chevron-icon.rotated {
      transform: rotate(180deg);
    }
  
    .options {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: 100;
      
      padding: 8px;
      background: var(--background-default-page-secondary, white);
      box-shadow: 0px 4px 6px rgba(12, 12, 13, 0.1), 0px 2px 4px rgba(12, 12, 13, 0.06);
      border-radius: 8px;
      border: 1px solid var(--border-secondary, #DADBDD);
      
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      max-height: 300px;
      overflow-y: auto;
    }
  
    .option {
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      border-radius: 4px;
      
      text-align: left;
      color: var(--text-default, #444955);
      font-size: 16px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 20px;
      
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
  
    .option:hover {
      background: #F3F4F6;
    }
  
    .option.selected {
      background: var(--icons-inverted-brand-primary, #E7F6F1);
      color: var(--icons-default-brand-primary, #0FA376);
      font-weight: 700;
    }
  
    .error-message {
      color: #DC2626;
      font-size: 14px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 16px;
    }
  </style>