<script>
  import {updateBudgetAmount} from '$lib/api/receipts.js';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import BudgetIcon from '$lib/assets/icon_budgetcheck.svg';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import Button from '$lib/components/Button.svelte';

  let showModal = $state(false);
  let budgetInput = $state('400');

  let {budgetId = null, spent = 42.18, 
    budget = $bindable(400), 
    remaining = $bindable(budget - spent), 
    percentage = $bindable(Math.round((spent / budget) * 100))
  } = $props();
  
  function openModal() {
    budgetInput = budget.toString();
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  async function handleConfirm() {
    const newAmount = parseFloat(budgetInput.replace(/[$,]/g, ''));
  
  if (isNaN(newAmount) || newAmount <= 0) {
    alert('Please enter a valid budget amount');
    return;
  }

    if (budgetId !== null) {
      try {
        await updateBudgetAmount(budgetId, budgetInput);
        budget = newAmount;
        remaining = newAmount - spent;
        percentage = Math.round((spent / newAmount) * 100);
      } catch (error) {
        console.error('Error updating budget amount:', error);
        alert('There was an error updating your budget. Please try again.');      
      }
    }
    closeModal();
  }

  $effect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  });
</script>

<section class="budget-check">
  <h2 class="section-title">Budget Check</h2>

  <div class="budget-content">
    <div class="spending-row">
      <div class="status-icon">
        <img src={BudgetIcon} alt="" />
      </div>

      <div class="spending-info">
        <div class="amount-spent-container">
          <!-- <div class="comparison-text">{comparison}</div> -->
          <div class="spent-amount">${spent.toFixed(2)} spent</div>
        </div>

        <div class="budget-total">
          <div class="total-amount">${budget.toFixed(0)}</div>
          <div class="budget-label">Budget</div>
        </div>
      </div>
    </div>

    <div class="status-bar">
      
      <div class="percentage-text">{percentage}%</div>
      <div class="progress-wrapper">
        <ProgressBar value={spent} max={budget} color="#0FA376" />
        <div class="remaining-text">${remaining.toFixed(2)} remaining</div>
      </div>
    </div>

    <button class="set-budget-link" onclick={openModal}>
      Set new budget
    </button>
  </div>
</section>

{#if showModal}
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
      <div class="modal-handle"></div>

      <h2 id="modal-title" class="modal-title">Set Your Monthly Budget</h2>

      <div class="budget-input-section">
        <label for="budget-input" class="input-label">Enter Your Budget Here</label>
        <InputField
          id="budget-input"
          bind:value={budgetInput}
          placeholder="$0.00"
          type="text"
        />
      </div>

      <Button text="Confirm" onclick={handleConfirm} />
    </div>
  </div>
{/if}

<style>
  .budget-check {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }

  .section-title {
    color: var(--text-default, #444955);
    font-size: 20px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 24px;
    padding: 24px 0 0;
    margin: 0;
  }

  .budget-content {
    padding: 24px;
    background: var(--Color-Green-50, #E7F6F1);
    box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .spending-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-icon {
    width: 48px;
    height: 48px;
    background: var(--background-default-brand-primary, #0FA376);
    box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .spending-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .amount-spent-container {
    flex: 1;
    height: 44px;
    position: relative;
  }


  .spent-amount {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--text-brand-primary, #0FA376);
    font-size: 18px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 24px;
  }

  .total-amount {
    color: var(--text-default, #444955);
    font-size: 24px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 32px;
  }

  .budget-label {
    color: var(--text-secondary, #737780);
    font-size: 12px;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    line-height: 16px;
    text-align: right;
  }

  .remaining-text {
    color: var(--text-secondary, #737780);
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    line-height: 16px;
  }

  .progress-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .percentage-text {
    color: var(--text-secondary, #737780);
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
  }

  .set-budget-link {
    background: none;
    border: none;
    color: var(--text-secondary, #737780);
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    text-decoration: underline;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    padding: 0;
  }

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
    width: 100%;
    max-width: 420px;
    padding: 32px 16px;
    background: white;
    border-radius: 32px 32px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .modal-handle {
    width: 50px;
    height: 5px;
    background: var(--border-secondary, #DADBDD);
    border-radius: 2.5px;
  }

  .modal-title {
    color: var(--text-default, #444955);
    font-size: 24px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 32px;
    text-align: center;
    margin: 0;
  }

  .budget-input-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .input-label {
    color: var(--text-default, #444955);
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    line-height: 16px;
    text-align: left;
  }
</style>