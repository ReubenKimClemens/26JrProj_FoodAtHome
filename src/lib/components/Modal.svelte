<script>
    import { fade, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    let {
      open = $bindable(false),
      title = 'Add New Item',
      onAdd = () => {},
      onReset = () => {}
    } = $props();
  
    let itemName = $state('');
    let price = $state('');
    let selectedCategory = $state('');
    let quantity = $state(1);
    let unit = $state('');
    let date = $state('');
    let note = $state('');
  
    import categoryCarrot from '$lib/assets/category_carrot.svg';
    import categoryMeat from '$lib/assets/category_beef.svg';
    import categoryBread from '$lib/assets/category_wheat.svg';
    import categoryMilk from '$lib/assets/category_milk.svg';
    import categoryCup from '$lib/assets/category_soda.svg';
    import categoryTrash from '$lib/assets/category_snacks.svg';
    import categoryCannedFood from '$lib/assets/category_cannedfood.svg';
    import categoryBottle from '$lib/assets/category_ketchup.svg';
    import categoryPepper from '$lib/assets/category_chili.svg';
    import categoryLeftover from '$lib/assets/category_leftover.svg';
    import categorySnowflake from '$lib/assets/category_frozen.svg';
    import categoryMisc from '$lib/assets/category_misc.svg';
  
    const categories = [
      { id: 'produce', label: 'Produce', icon: categoryCarrot, color: '#FFF4ED' },
      { id: 'protein', label: 'Protein', icon: categoryMeat, color: '#FFF0F0' },
      { id: 'bread', label: 'Bread', icon: categoryBread, color: '#FFFAED' },
      { id: 'dairy', label: 'Dairy', icon: categoryMilk, color: '#F4F3FF' },
      { id: 'drinks', label: 'Drinks', icon: categoryCup, color: '#EFF6FF' },
      { id: 'snacks', label: 'Snacks', icon: categoryTrash, color: '#ECFEFF' },
      { id: 'pantry', label: 'Pantry', icon: categoryCannedFood, color: '#F4F3FF' },
      { id: 'sauces', label: 'Sauces', icon: categoryBottle, color: '#FCE7F3' },
      { id: 'spices', label: 'Spices', icon: categoryPepper, color: '#FFF0F0' },
      { id: 'leftover', label: 'Leftover', icon: categoryLeftover, color: '#ECFEFF' },
      { id: 'frozen', label: 'Frozen', icon: categorySnowflake, color: '#EFF6FF' },
      { id: 'misc', label: 'Misc', icon: categoryMisc, color: '#F5F5F5' }
    ];
  
    function handleBackdropClick(e) {
      if (e.target === e.currentTarget) {
        open = false;
      }
    }
  
    function handleAdd() {
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
        transition:scale={{ duration: 300, easing: quintOut, start: 0.95 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="modal-header">
          <div class="handle"></div>
          <h2 id="modal-title" class="modal-title">{title}</h2>
        </div>
  
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
  
          <div class="form-row">
            <div class="quantity-group">
              <button type="button" class="qty-btn" onclick={decrementQuantity}>−</button>
              <input 
                type="number" 
                bind:value={quantity}
                class="qty-input"
                min="1"
              />
              <button type="button" class="qty-btn" onclick={incrementQuantity}>+</button>
            </div>
            <div class="form-group flex-grow">
              <input 
                type="text" 
                bind:value={unit}
                placeholder="Unit"
                class="input"
              />
            </div>
          </div>
  
          <div class="form-group">
            <label for="date">Date</label>
            <div class="date-input-wrapper">
              <input 
                id="date"
                type="text" 
                bind:value={date}
                placeholder="mm/dd/yyyy"
                class="input"
              />
              <span class="calendar-icon">📅</span>
            </div>
          </div>
  
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
  
        <div class="modal-actions">
          <button class="btn btn-reset" onclick={handleReset}>
            Reset
          </button>
          <button class="btn btn-add" onclick={handleAdd}>
            Add
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
      border-radius: 2px;
    }
  
    .modal-title {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.4;
      color: #000;
      margin: 0;
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
      gap: 8px;
      flex: 1;
    }
  
    .flex-grow {
      flex: 1;
    }
  
    label {
      font-size: 14px;
      font-weight: 500;
      color: #000;
    }
  
    .category-label {
      font-size: 14px;
      font-weight: 500;
      color: #000;
    }
  
    .input {
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      font-size: 14px;
      color: #000;
      background: #fff;
      width: 100%;
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
      grid-template-columns: repeat(6, 1fr);
      gap: 12px;
    }
  
    .category-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 12px 8px;
      border: 2px solid transparent;
      border-radius: 12px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
  
    .category-btn.selected {
      border-color: #10b981;
    }
  
    .category-icon {
      width: 24px;
      height: 24px;
    }
  
    .category-label {
      font-size: 10px;
      color: #000;
      text-align: center;
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
    }
  
    .qty-input:focus {
      outline: none;
    }
  
    .date-input-wrapper {
      position: relative;
    }
  
    .calendar-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      font-size: 18px;
    }
  
    .textarea {
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      font-size: 14px;
      color: #000;
      background: #fff;
      width: 100%;
      resize: vertical;
      font-family: inherit;
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