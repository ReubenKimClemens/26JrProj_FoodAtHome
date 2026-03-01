<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { getCategoryColor } from '$lib/categoryColors.js';
  import { X } from 'lucide-svelte';
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';


  let {
    open = $bindable(false),
    title = 'Add New Item',
    onAdd = () => {},
    onReset = () => {},
    // ⛽️Pre-filling when edits are made
    initialData = null
  } = $props();

  let itemName = $state('');
  let price = $state(null);
  let priceInput = $state('');
  let selectedCategory = $state('');
  let quantity = $state(1);
  let unit = $state('');
  let date = $state('');
  let note = $state('');

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  import categoryAll from '$lib/assets/category_all_inactive.svg';
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
  import categoryDessert from '$lib/assets/category_dessert_inactive.svg';

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

  const itemCategories = [
    'Produce',
    'Protein',
    'Wheat',
    'Dairy',
    'Drinks',
    'Snacks',
    'Pantry',
    'Sauces',
    'Spices',
    'Leftover',
    'Frozen',
    'Misc'
  ];

  // ❌Close modal when clicking outside (on backdrop)
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }
  function handleClose() {
    open = false;
  }

  // ⌨️Accessible keyboard navigation
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      open = false;
    }
  }


  function handleAdd() {
    if (!itemName.trim()) {
      alert('Please enter an item name');
      return;
    }
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    if (price === null || price === '') {
      alert('Please enter a price');
      return;
    }

    if (price !== null && price !== '' && !Number.isFinite(Number(price))) {
      alert('Please enter a valid price');
      return;
    }

    onAdd({
      itemName,
      price,
      category: selectedCategory,
      quantity,
      unit,
      date,
      note
    });
    open = false;
    handleReset();  //🧼Clear form after adding
  }

  function handleReset() {
    itemName = '';
    price = null;
    priceInput = '';
    selectedCategory = '';
    quantity = 1;
    unit = '';
    date = '';
    note = '';
    onReset();
  }

  function incrementQuantity() {
    quantity += 1;
  }

  function decrementQuantity() {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  function formatPrice(value) {
    return value === null || Number.isNaN(value) ? '' : currencyFormatter.format(value);
  }

  function normalizePriceInput(value) {
    const digitsAndDotOnly = value.replace(/[^\d.]/g, '');
    const [whole = '', ...fractionParts] = digitsAndDotOnly.split('.');

    if (fractionParts.length === 0) {
      return whole;
    }

    return `${whole}.${fractionParts.join('').slice(0, 2)}`;
  }

  function handlePriceInput(event) {
    const normalized = normalizePriceInput(event.currentTarget.value);
    priceInput = normalized;
    price = normalized === '' ? null : Number(normalized);
  }

  function handlePriceFocus() {
    priceInput = price === null || Number.isNaN(price) ? '' : price.toFixed(2);
  }

  function handlePriceBlur() {
    priceInput = formatPrice(price);
  }

  // ← ⛽️Pre-fill form when modal opens with initialData
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
      note = '';
    } else if (open && !initialData) {
      handleReset();
    }
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
  <!-- 🌑Semi-transparent backdrop -->
  <div 
    class="modal-backdrop" 
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    role="presentation"
  >

  <!-- 📦Main modal container -->
  <div 
    class="modal"
    transition:fly={{ y: 500, duration: 300, easing: quintOut }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >

    <!-- 📌Modal header with drag handle and title -->
    <div class="modal-header">
      <!-- <div 
        class="handle" 
        onclick={handleClose}
        onkeydown={(e) => e.key === 'Enter' && handleClose()}
        role="button"
        tabindex="0"
        aria-label="Close modal"
      ></div> -->

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

    <!-- 📝Form content area -->
    <div class="modal-content">

      <div class="first-row">

        <div class="form-group">
          <label for="item-name" class="title-sm">Item Name</label>
          <input 
            id="item-name"
            type="text" 
            bind:value={itemName}
            class="input"
          />
        </div>

        <div class="form-group">
          <label for="price" class="title-sm">Price</label>
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
          />
        </div>

      </div>

      <!-- 🗂️Category Selection Grid -->
      <div class="form-group">
        <span class="title-sm">Category</span>

        <!-- <div class="category-grid">
          {#each categories as category}
            <button
              type="button"
              class="category-btn"
              class:selected={selectedCategory === category.id}
              style="background-color: {category.color}"
              onclick={() => selectedCategory = category.id}
            >
              <img src={category.icon} alt={category.label} class="category-icon" />
              <span class="category-label">{category.label}</span>
            </button>
          {/each}
        </div> -->

        <CategoryIcon
        wrap
        categories={itemCategories}
        bind:activeCategory={selectedCategory} />

      </div>




      <!-- 🔢Quantity & Unit Row -->
      <div class="quantity-row">

        <div class="quantity-group">
          <button 
            type="button" 
            class="qty-btn" 
            onclick={decrementQuantity}
          >−</button>

          <input 
            type="number" 
            bind:value={quantity}
            class="qty-input"
            min="1"
            aria-label="Quantity"
          />
          <button 
            type="button" 
            class="qty-btn" 
            onclick={incrementQuantity}
            aria-label="Increase Quantity"  
          >+</button>
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

      <!-- 📅Date Picker -->
      <div class="form-group">
        <label for="date" class="title-sm">Date</label>
        <div class="date-input-wrapper">
          <input 
            id="date"
            type="date" 
            bind:value={date}
            class="input"
          />
        </div>
      </div>

      <!-- 📝Notes Textarea -->
      <div class="form-group">
        <label for="note" class="title-sm">Note</label>
        <textarea 
          id="note"
          bind:value={note}
          class="textarea"
          rows="3"
        ></textarea>
      </div>
    </div>

    <!-- 🔁Button text changes based on mode -->
    <div class="modal-actions">
      <button class="btn btn-reset" onclick={handleReset}>
        Reset
      </button>
      <button class="btn btn-add" onclick={handleAdd}>
        {initialData ? 'Save' : 'Add'}
      </button>
    </div>
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

  /* general modal style */
  .modal {
    display: flex;
    width: 100%;
    max-width: 402px;
    padding: 32px 16px;
    flex-direction: column;
    justify-content: center;

    gap: 16px;
    border-radius: 32px 32px 0 0;
    background: #fff;
    max-height: 90vh;
    overflow-y: auto;
  }

  /* header */
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

  /* form */
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
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

  .input::placeholder {
    color: #9ca3af;
  }

  .input:focus {
    outline: none;
    border-color: #10b981;
  }

  .categories-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  /* .category-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 4px;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
  }

  .category-btn.selected {
    border-color: #10b981;
  }

  .category-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .category-label {
    font-size: 9px;
    color: #000;
    text-align: center;
    font-family: 'Nunito', sans-serif;
    line-height: 1.2;
  } */

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
    color: #000;
  }

  .qty-btn:active {
    transform: scale(0.95);
  }

  .qty-input {
    width: 40px;
    text-align: center;
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    font-family: 'Nunito', sans-serif;
  }

  .qty-input:focus {
    outline: none;
  }

  .date-input-wrapper {
    position: relative;
  }

  .textarea {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    font-size: 14px;
    color: #000;
    background: #fff;
    width: 100%;
    resize: vertical;
    font-family: inherit;
    font-family: 'Nunito', sans-serif;
  }

  .textarea::placeholder {
    color: #9ca3af;
  }

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

  .btn {
    flex: 1;
    padding: 14px 24px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
    font-family: 'Nunito', sans-serif;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn-reset {
    background: transparent;
    color: #10b981;
  }

  .btn-add {
    background: #10b981;
    color: white;
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
