<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { getCategoryColor } from '$lib/categoryColors.js';
  import { X } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import categoryProduce from '$lib/assets/category_produce_inactive.svg';
  import categoryProtein from '$lib/assets/category_protein_inactive.svg';
  import categoryWheat from '$lib/assets/category_wheat_inactive.svg';
  import categoryDairy from '$lib/assets/category_dairy_inactive.svg';
  import categoryDrinks from '$lib/assets/category_drinks_inactive.svg';
  import categorySnacks from '$lib/assets/category_snacks_inactive.svg';
  import categoryPantry from '$lib/assets/category_pantry_inactive.svg';
  import categorySauces from '$lib/assets/category_sauces_inactive.svg';
  import categorySpices from '$lib/assets/category_spices_inactive.png';
  import categoryLeftover from '$lib/assets/category_leftover_inactive.png';
  import categoryFrozen from '$lib/assets/category_frozen_inactive.svg';
  import categoryMisc from '$lib/assets/category_misc_inactive.svg';

  let {
    open = $bindable(false),
    title = 'Add New Item',
    onAdd = () => {},
    onDelete = null,
    onReset = () => {},
    initialData = null
  } = $props();

  const isEditMode = $derived(!!initialData);

  let itemName = $state('');
  let itemNameError = $state('');
  let price = $state(null);
  let priceInput = $state('');
  let priceError = $state('');
  let selectedCategory = $state('');
  let categoryError = $state('');
  let formError = $state('');
  let quantity = $state(1);
  let unit = $state('');
  let date = $state('');
  let note = $state('');

  const categories = [
    { id: 'Produce', label: 'Produce', icon: categoryProduce, color: getCategoryColor('Produce').light },
    { id: 'Protein', label: 'Protein', icon: categoryProtein, color: getCategoryColor('Protein').light },
    { id: 'Wheat', label: 'Wheat', icon: categoryWheat, color: getCategoryColor('Wheat').light },
    { id: 'Dairy', label: 'Dairy', icon: categoryDairy, color: getCategoryColor('Dairy').light },
    { id: 'Drinks', label: 'Drinks', icon: categoryDrinks, color: getCategoryColor('Drinks').light },
    { id: 'Snacks', label: 'Snacks', icon: categorySnacks, color: getCategoryColor('Snacks').light },
    { id: 'Pantry', label: 'Pantry', icon: categoryPantry, color: getCategoryColor('Pantry').light },
    { id: 'Sauces', label: 'Sauces', icon: categorySauces, color: getCategoryColor('Sauces').light },
    { id: 'Spices', label: 'Spices', icon: categorySpices, color: getCategoryColor('Spices').light },
    { id: 'Leftover', label: 'Leftover', icon: categoryLeftover, color: getCategoryColor('Leftover').light },
    { id: 'Frozen', label: 'Frozen', icon: categoryFrozen, color: getCategoryColor('Frozen').light },
    { id: 'Misc', label: 'Misc', icon: categoryMisc, color: getCategoryColor('Misc').light },
  ];
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const itemCategories = [
    'Produce', 'Protein', 'Wheat', 'Dairy', 'Drinks', 'Snacks',
    'Pantry', 'Sauces', 'Spices', 'Leftover', 'Frozen', 'Misc'
  ];

  // ❌Close modal when clicking outside (on backdrop)
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) handleClose();
  }

  function handleClose() {
    open = false;
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') open = false;
  }

  function handleAdd() {
    if (!validateForm(true)) {
      formError = 'Please fill out all required fields.';
      return;
    }
    formError = '';
    onAdd({ itemName, price, category: selectedCategory, quantity, unit, date, note });
    open = false;
    handleReset();
  }

  function handleReset() {
    itemName = '';
    itemNameError = '';
    price = null;
    priceInput = '';
    priceError = '';
    selectedCategory = '';
    categoryError = '';
    formError = '';
    quantity = 1;
    unit = '';
    date = '';
    note = '';
    onReset();
  }

  function incrementQuantity() { quantity += 1; }
  function decrementQuantity() { if (quantity > 1) quantity -= 1; }

  function validateForm(showRequired = false) {
    return validateItemName(showRequired) & validateCategory(showRequired) & validatePrice(showRequired);
  }

  function validateItemName(showRequired = false) {
    const normalizedName = itemName.trim();
    if (!normalizedName) {
      itemNameError = showRequired ? 'Item name is required.' : '';
      return false;
    }
    itemNameError = '';
    itemName = normalizedName;
    return true;
  }

  function handleItemNameInput() {
    if (itemNameError) validateItemName(true);
  }

  function handleItemNameBlur() { validateItemName(true); }

  function validateCategory(showRequired = false) {
    if (!selectedCategory) {
      categoryError = showRequired ? 'Category is required.' : '';
      return false;
    }
    categoryError = '';
    return true;
  }

  function validatePrice(showRequired = false) {
    if (price === null || price === '') {
      priceError = showRequired ? 'Price is required.' : '';
      return false;
    }
    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      priceError = 'Enter a valid price.';
      return false;
    }
    priceError = '';
    return true;
  }

  function formatPrice(value) {
    return value === null || Number.isNaN(value) ? '' : currencyFormatter.format(value);
  }

  function normalizePriceInput(value) {
    const digitsAndDotOnly = value.replace(/[^\d.]/g, '');
    const [whole = '', ...fractionParts] = digitsAndDotOnly.split('.');
    if (fractionParts.length === 0) return whole;
    return `${whole}.${fractionParts.join('').slice(0, 2)}`;
  }

  function handlePriceInput(event) {
    const rawValue = event.currentTarget.value;
    if (/[^\d.$]/.test(rawValue)) {
      priceInput = rawValue;
      price = null;
      priceError = 'Enter a valid price.';
      return;
    }
    const normalized = normalizePriceInput(rawValue);
    priceInput = normalized;
    price = normalized === '' ? null : Number(normalized);
    if (priceError) validatePrice(true);
  }

  function handlePriceFocus() {
    priceInput = price === null || Number.isNaN(price) ? '' : price.toFixed(2);
  }

  function handlePriceBlur() {
    priceInput = formatPrice(price);
    validatePrice(true);
  }

  $effect(() => {
    if (open && initialData) {
      const initialPrice = initialData.unit_price ?? null;
      itemName = initialData.item_name || '';
      price = initialPrice;
      priceInput = formatPrice(initialPrice);
      selectedCategory = initialData.category || '';
      quantity = initialData.quantity || 1;
      unit = initialData.unit_name || '';
      date = initialData.created_at ? new Date(initialData.created_at).toISOString().split('T')[0] : '';
      note = initialData.notes || '';
    } else if (open && !initialData) {
      handleReset();
    }
  });

  $effect(() => {
    if (categoryError && selectedCategory) validateCategory(true);
  });

  $effect(() => {
    if (formError && validateForm(false)) formError = '';
  });

  $effect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
      };
    }
  });
</script>

{#if open}
  <div
    class="modal-backdrop"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    role="presentation"
  >
    <div
      class="modal"
      transition:fly={{ y: 500, duration: 300, easing: quintOut }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div class="modal-header">
        <h2 id="modal-title" class="title-lg">{title}</h2>
        <button
          class="close-btn"
          aria-label="close button"
          tabindex="0"
          onclick={handleClose}
          onkeydown={(e) => e.key === 'Enter' && handleClose()}
        >
          <X size={36} strokeWidth={1.2} />
        </button>
      </div>

      <div class="modal-content">
        <div class="first-row">
          <div class="form-group">
            <div class="label-wrapper">
              <label for="item-name" class="title-sm">Item Name</label>
              <span class="required">*</span>
            </div>
            <input
              id="item-name"
              type="text"
              required
              bind:value={itemName}
              class="input"
              class:input-error={!!itemNameError}
              aria-invalid={itemNameError ? 'true' : 'false'}
              aria-describedby="item-name-error"
              oninput={handleItemNameInput}
              onblur={handleItemNameBlur}
            />
            <span class="error-message" id="item-name-error" role="alert">{itemNameError}</span>
          </div>

          <div class="form-group">
            <div class="label-wrapper">
              <label for="price" class="title-sm">Price</label>
              <span class="required">*</span>
            </div>
            <input
              id="price"
              type="text"
              inputmode="decimal"
              value={priceInput}
              oninput={handlePriceInput}
              onfocus={handlePriceFocus}
              onblur={handlePriceBlur}
              placeholder="$0.00"
              class="input"
              class:input-error={!!priceError}
              aria-invalid={priceError ? 'true' : 'false'}
              aria-describedby="price-error"
            />
            <span class="error-message" id="price-error" role="alert">{priceError}</span>
          </div>
        </div>

        <div class="form-group">
          <div class="label-wrapper">
            <span class="title-sm">Category</span>
            <span class="required">*</span>
            <span class="error-message" id="category-error" role="alert">{categoryError}</span>
          </div>
          <CategoryIcon wrap categories={itemCategories} bind:activeCategory={selectedCategory} />
        </div>

        <div class="quantity-row">
          <div class="quantity-group">
            <button type="button" class="qty-btn" onclick={decrementQuantity}>−</button>
            <input
              type="number"
              bind:value={quantity}
              class="qty-input"
              min="1"
              aria-label="Quantity"
            />
            <button type="button" class="qty-btn" onclick={incrementQuantity} aria-label="Increase Quantity">+</button>
          </div>
          <div class="form-group flex-grow">
            <input
              type="text"
              bind:value={unit}
              placeholder="Unit (e.g., lbs, oz)"
              class="input"
              aria-label="Unit"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="date" class="title-sm">Date Added</label>
          <div class="date-input-wrapper">
            <input id="date" type="date" bind:value={date} class="input" />
          </div>
        </div>

        <div class="form-group">
          <label for="note" class="title-sm">Note</label>
          <textarea id="note" bind:value={note} class="textarea body-md" rows="4"></textarea>
        </div>
      </div>

      {#if formError}
        <p class="form-error body-sm" role="alert">{formError}</p>
      {/if}

      <div class="modal-actions">
        {#if !isEditMode}
            <Button text="Reset" variant="secondary" onclick={handleReset} />
        {/if}
          <Button text={isEditMode ? 'Save' : 'Add'} variant="primary" onclick={handleAdd} />
      </div>
      
      {#if isEditMode && onDelete}
        <Button text="Delete" variant="danger" onclick={() => { open = false; onDelete(); }} />      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    display: flex;
    width: 100%;
    max-width: 430px;
    max-height: 90vh;
    padding: 32px 16px;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    border-radius: 32px 32px 0 0;
    background: #fff;
    max-height: 95vh;
  }

  .modal-header {
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
  }

  .close-btn {
    background: transparent;
    border: transparent;
    cursor: pointer;
    position: absolute;
    right: 0;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    overflow-y: auto;

  }

  .first-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(120px, 160px);
    gap: 12px;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    font-size: 14px;
    color: #000;
    background: #fff;
    font-family: 'Nunito', sans-serif;
    transition: border-color 0.2s ease;
  }

  .input::placeholder { color: #9ca3af; }

  .input:focus {
    outline: none;
    border-color: var(--text-brand-primary);
  }

  .input-error {
    border: 1.5px solid var(--text-danger);
    background-color: var(--bg-danger);
  }

  .error-message {
    font-family: "Nunito", sans-serif;
    min-height: 18px;
    color: var(--text-danger);
    font-size: 12px;
    line-height: 1.4;
  }

  .form-error {
    margin: 0;
    color: var(--text-danger);
    text-align: center;
  }

  .required { color: var(--text-danger); }

  .quantity-row {
    display: flex;
    gap: 8px;
  }

  .quantity-group {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 8px 12px;
    width: fit-content;
  }

  .qty-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-default);
  }

  .qty-btn:active { transform: scale(0.8); }

  .qty-input {
    width: 40px;
    text-align: center;
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    font-family: 'Nunito', sans-serif;
  }

  .qty-input:focus { outline: none; }

  .date-input-wrapper { position: relative; }

  .textarea {
    border: 1px solid #e5e7eb;
    padding: 1rem;
    border-radius: 8px;
    color: var(--text-default);
    background: #fff;
    width: 100%;
    resize: vertical;
  }

  .textarea::placeholder { color: #9ca3af; }

  .textarea:focus {
    outline: none;
    border-color: #10b981;
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    width: 100%;
    margin-top: 8px;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>
