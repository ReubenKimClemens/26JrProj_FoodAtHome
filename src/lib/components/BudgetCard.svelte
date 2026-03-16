<script>
  import {updateBudgetAmount} from '$lib/api/receipts.js';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import BudgetIcon from '$lib/assets/icon_budgetcheck_green.svg';
  import BudgetIconOrange from '$lib/assets/icon_budgetcheck_orange.svg';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import Button from '$lib/components/Button.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import Page from '../../routes/+page.svelte';

  let showModal = $state(false);
  let budgetInput = $state('400');
  let budgetError = $state('');  
  let formError = $state('');

  let {
    budgetId = null,
    spent = 42.18,
    showTitle = true,
    budget = $bindable(400),
    lastMonthSpent = 300
  } = $props();

  let remaining = $derived(budget - spent);
  let percentage = $derived(Math.round((spent / budget) * 100));
  let diff = $derived(spent - lastMonthSpent);
  let diffPercent = $derived(lastMonthSpent ? (Math.abs(diff) / lastMonthSpent) * 100 : 0);
  let comparisonText = $derived(lastMonthSpent ? `${diffPercent.toFixed(1)}% ${diff > 0 ? 'more' : 'less'} than last month` : `${percentage}%`);
  
  let isOverBudget = $derived(spent > budget);
    const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function validateBudget(showRequired = false) {
    if (budget === null || budget === '') {
      budgetError = showRequired ? 'Budget is required.' : '';
      return false;
    }

    if (!Number.isFinite(Number(budget)) || Number(budget) < 0) {
      budgetError = 'Please enter a valid budget.';
      return false;
    }

    if (Number(budget) > 99999) {
      budgetError = 'We only accept budget up to $99,999';
      return false;
    }

    budgetError = '';
    return true;
  }

  function formatBudget(value) {
    return value === null || Number.isNaN(value) ? '' : currencyFormatter.format(value);
  }

  function normalizeBudgetInput(value) {
    const digitsAndDotOnly = value.replace(/[^\d.]/g, '');
    const [whole = '', ...fractionParts] = digitsAndDotOnly.split('.');
    const limitedWhole = whole.slice(0, 8);
    if (fractionParts.length === 0) return limitedWhole;
    return `${limitedWhole}.${fractionParts.join('').slice(0, 2)}`;
  }

  function handleBudgetInput(event) {
    const rawValue = event.currentTarget.value;
    if (/[^\d.$]/.test(rawValue)) {
      budgetInput = rawValue;
      budget = null;
      budgetError = 'Please enter a valid number.';
      return;
  }
  const normalized = normalizeBudgetInput(rawValue);
  budgetInput = normalized;
  budget = normalized === '' ? null : Number(normalized);
  if (budgetError) validateBudget(true);
  }

  function handleBudgetFocus() {
    budgetInput = budget === null || Number.isNaN(budget) ? '' : budget.toFixed(2);
  }
  
  function openModal() {
    budgetInput = formatBudget(budget);
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

  function validateForm(showRequired = false) {
    return validateBudget(showRequired);
  }

  async function handleConfirm() {
    const newAmount = parseFloat(budgetInput.replace(/[$,]/g, ''));
  
    if (isNaN(newAmount) || newAmount <= 0 || !validateForm(true)) {
      // alert('Please enter a valid budget amount');
      formError = "Please enter a valid budget amount.";
      return;
    }

    if (budgetId !== null) {
      try {
        await updateBudgetAmount(budgetId, newAmount);
        budget = newAmount;
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
  {#if showTitle}
    <h2 class="section-title">Budget Check</h2>
  {/if}

  <div class="budget-content" style="background: {isOverBudget ? '#FFF0E5' : '#E7F6F1'}">
    <div class="spending-row">
      <div class="status-icon">
        <img src={isOverBudget ? BudgetIconOrange : BudgetIcon} alt="" />      
      </div>

      <div class="spending-info">
        <div class="amount-spent-container">
          <div class="spent-amount" style="color: {isOverBudget ? '#FF9040' : '#0FA376'}">
            ${spent.toFixed(2)} spent
          </div>
          <div class="percentage-text body-xsm" style="color: {isOverBudget ? '#FF9040' : '#0FA376'}">
            {comparisonText}
          </div>
        </div>
        <div class="budget-total">
          <div class="total-amount">${budget.toFixed(0)}</div>
          <div class="budget-label">Budget</div>
        </div>
      </div>
    </div>

    <div class="status-bar">
      <div class="progress-wrapper">
        <ProgressBar value={spent} max={budget} color={isOverBudget ? '#FF9040' : '#0FA376'} />

        <div class="spent-text body-xsm">
          <p>${spent.toFixed(2)} spent</p>
          <p>out of ${budget.toFixed(0)}</p>
        </div>
      </div>
    </div>

    <button class="set-budget-link" onclick={openModal}>
      Set New Monthly Budget
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
          inputmode="decimal"
          oninput={handleBudgetInput}
          onfocus={handleBudgetFocus}
          class="input {budgetError ? 'input-error' : ''}"
          aria-invalid={budgetError ? 'true' : 'false'}
          aria-describedby="budget-error"
        />
        <span class="error-message" id="budget-error" role="alert">{budgetError}</span>

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

  .percentage-text {
    position: absolute;
    top: 30px;

  }

  .spent-text {
    color: var(--text-secondary);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .spent-text p {
    display: block;
    padding: 0;
    margin: 0;
  }

  .progress-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
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
    max-width: 430px;
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

  .error-message {
    font-family: "Nunito", sans-serif;
    min-height: 18px;
    color: var(--text-danger);
    font-size: 12px;
    line-height: 1.4;
  }
</style>