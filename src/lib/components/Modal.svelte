<script>
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';


  let {
    open = $bindable(false),
    title = 'Add New Item',
    onAdd = () => {},
    onReset = () => {},
    // ⛽️Pre-filling when edits are made
    initialData = null
  } = $props();

  let itemName = $state('');
  let price = $state('');
  let selectedCategory = $state('');
  let quantity = $state(1);
  let unit = $state('');
  let date = $state('');
  let note = $state('');

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
    { id: 'All', label: 'All', icon: categoryAll, color: '#E6FAF7' },
    { id: 'Produce', label: 'Produce', icon: categoryProduce, color: '#FFE1CC' },
    { id: 'Protein', label: 'Protein', icon: categoryProtein, color: '#FCE9E9' },
    { id: 'Wheat', label: 'Wheat', icon: categoryWheat, color: '#FFEFB0' },
    { id: 'Dairy', label: 'Dairy', icon: categoryDairy, color: '#EAEAFC' },
    { id: 'Drinks', label: 'Drinks', icon: categoryDrinks, color: '#E6F3FF' },
    { id: 'Snacks', label: 'Snacks', icon: categorySnacks, color: '#E6F9FD' },
    { id: 'Pantry', label: 'Pantry', icon: categoryPantry, color: '#EFEEFE' },
    { id: 'Sauces', label: 'Sauces', icon: categorySauces, color: '#FAEAFC' },
    { id: 'Spices', label: 'Spices', icon: categorySpices, color: '#FFE5E5' },
    { id: 'Leftover', label: 'Leftover', icon: categoryLeftover, color: '#E6FAF7' },
    { id: 'Frozen', label: 'Frozen', icon: categoryFrozen, color: '#B0DAFF' },
    { id: 'Misc', label: 'Misc', icon: categoryMisc, color: '#DADBDD' },
    { id: 'Dessert', label: 'Dessert', icon: categoryDessert, color: '#FDEDF5' }
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
    price = '';
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

  // ← ⛽️Pre-fill form when modal opens with initialData
  $effect(() => {
    if (open && initialData) {
      itemName = initialData.item_name || '';
      price = initialData.unit_price ? `$${initialData.unit_price}` : '';
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
    transition:scale={{ duration: 300, easing: quintOut, start: 0.95 }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >

    <!-- 📌Modal header with drag handle and title -->
    <div class="modal-header">
      <div 
        class="handle" 
        onclick={handleClose}
        onkeydown={(e) => e.key === 'Enter' && handleClose()}
        role="button"
        tabindex="0"
        aria-label="Close modal"
      ></div>
      <h2 id="modal-title" class="modal-title">{title}</h2>
    </div>

    <!-- 📝Form content area -->
    <div class="modal-content">
      <div class="form-row">
        <div class="form-group">
          <label for="item-name">Item Name</label>
          <input 
            id="item-name"
            type="text" 
            bind:value={itemName}
            class="input"
          />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input 
            id="price"
            type="text" 
            bind:value={price}
            placeholder="$0.00"
            class="input"
          />
        </div>
      </div>

      <!-- 🗂️Category Selection Grid -->
      <div class="form-group">
        <div class="category-label">Category</div>
        <div class="category-grid">
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
        </div>
      </div>

      <!-- 🔢Quantity & Unit Row -->
      <div class="form-row">
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
        <label for="date">Date</label>
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
        <label for="note">Note</label>
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

  .modal {
    display: flex;
    width: 100%;
    max-width: 420px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;

    gap: 16px;
    border-radius: 32px 32px 0 0;
    background: #fff;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .handle {
    width: 36px;
    height: 4px;
    background: #d1d5db;
    padding: .1rem;
    border-radius: 2px;
  }

  .modal-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: #000;
    margin: 0;
    font-family: 'Quicksand', sans-serif;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .form-row {
    display: flex;
    gap: 12px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    flex: 1;
  }

  .flex-grow {
    flex: 1;
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-default, #444955);
    font-family: 'Nunito', sans-serif;
  }

  .category-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-default, #444955);
    font-family: 'Nunito', sans-serif;
  }

  .input {
    padding: 12px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    font-size: 14px;
    color: #000;
    background: #fff;
    width: 75%;
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

  .category-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }

  .category-btn {
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