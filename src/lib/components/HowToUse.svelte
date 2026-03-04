<script>
  import ChevronRight from '$lib/assets/chevron_right.svg';
  import Divider from '$lib/components/Divider.svelte';
  
  let {
    onItemClick = (item) => {}
  } = $props();
  
  const guides = $derived([
    {
      id: 'scan-upload',
      title: 'Scan and Upload a Receipt'
    },
    {
      id: 'manual-add',
      title: 'Manually Add a Receipt'
    },
    {
      id: 'read-analytics',
      title: 'How to Read the Analytics Graph'
    },
    {
      id: 'budget-analytics',
      title: 'How to Use Analytics to Help You Budget'
    },
    {
      id: 'set-budget',
      title: 'How to Set a New Budget'
    }
  ]);
  
  function handleGuideClick(guide) {
    onItemClick(guide);
  }
</script>

<div class="how-to-use-wrapper">
  <div class="header">
      <span class="header-title">How To Use</span>
  </div>
  <div class="how-to-use-container">
      {#each guides as guide, index}
      <button 
          class="guide-item"
          onclick={() => handleGuideClick(guide)}
          aria-label={guide.title}
      >
          <span class="guide-title">{guide.title}</span>
          <img src={ChevronRight} alt="" class="chevron-icon" />
      </button>
      
      {#if index < guides.length - 1}
          <Divider />
      {/if}
      {/each}
  </div>
</div>

<style>
  .how-to-use-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 24px;
  }

  .header {
      align-self: stretch;
      margin-bottom: 0;
  }

  .header-title {
      color: var(--text-default, #444955);
      font-size: 20px;
      font-family: Quicksand;
      font-weight: 700;
      text-transform: capitalize;
      line-height: 24px;
      word-wrap: break-word;
  }

  .how-to-use-container {
      padding: 24px 32px;
      background: var(--background-default-page-secondary, white);
      box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
      border-top-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin: 8px 0 0;
  }

  .guide-item {
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease;
      text-align: left;
  }

  .guide-title {
      color: var(--text-default, #444955);
      font-size: 16px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      flex: 1;
  }

  .chevron-icon {
      width: 24px;
      height: 24px;
  }
</style>