<script>
    import ChevronDown from '$lib/assets/chevron_down.svg';
    
    let {
      label = '',
      value = $bindable(''),
      options = [],
      placeholder = 'Newest First',
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
    
    // 📝Displayed text in the dropdown button
    const displayText = $derived(() => {
      if (!selectedOption) return placeholder;
      return typeof selectedOption === 'object' 
        ? selectedOption.label 
        : selectedOption;
    });
    
    // 🖱️Open or close the dropdown when clicked
    function toggleDropdown() {
      if (!disabled) {
        isOpen = !isOpen;
      }
    }
    
    // ✅When user selects an option, update the value and close menu
    function selectOption(option) {
      value = typeof option === 'object' ? option.value : option;
      isOpen = false;
    }
    
    // 👆Close dropdown when clicking outside of it
    function handleClickOutside(event) {
      if (dropdownRef && !dropdownRef.contains(event.target)) {
        isOpen = false;
      }
    }
    
    // ⌨️Accessible keyboard navigation
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
  
    .selected-text {
      flex: 1;
      text-align: left;
      color: var(--text-default, #444955);
      font-size: 16px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 20px;
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
</style>