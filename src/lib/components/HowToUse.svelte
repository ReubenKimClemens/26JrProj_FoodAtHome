<script>
    import ChevronRight from '$lib/assets/chevron_right.svg';
    
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
        <div class="divider"></div>
      {/if}
    {/each}
  </div>
  
  <style>
    .how-to-use-container {
      padding: 8px 32px;
      margin-bottom: 24px;
      background: var(--background-default-page-secondary, white);
      box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
    }
  
    .guide-item {
      width: 100%;
      padding: 16px 0;
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
      line-height: 20px;
      flex: 1;
    }
  
    .chevron-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
      flex-shrink: 0;
    }
  
    .divider {
      width: 100%;
      height: 1px;
      background: var(--border-primary, #737780);
    }
  </style>