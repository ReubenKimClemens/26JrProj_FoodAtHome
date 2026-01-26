<script>
    let {
      tips = [
        {
          number: 1,
          title: 'Capture the Important Info',
          description: 'Make sure your photo clearly shows the store name, location, items, prices, and the total amount.'
        },
        {
          number: 2,
          title: 'Take a clear photo',
          description: 'Use even lighting, flatten your receipt, and tap the screen to focus before taking the picture.'
        },
        {
          number: 3,
          title: 'Remove background clutter',
          description: 'Place the receipt on a clean, solid and dark surface so the scanner can easily detect edges.'
        },
        {
          number: 4,
          title: 'Smooth out wrinkles',
          description: 'Gently smooth out creases or folds so the printed text is easier for the system to read.'
        }
      ]
    } = $props();
  </script>
  
  <div class="scanning-tips-container">
    {#each tips as tip}
      <div class="tip-card">
        <div class="tip-number">
          <span>{tip.number}</span>
        </div>
        <div class="tip-content">
          <h3 class="tip-title">{tip.title}</h3>
          <p class="tip-description">{tip.description}</p>
        </div>
      </div>
    {/each}
  </div>
  
  <style>
    .scanning-tips-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
  
    .tip-card {
      padding: 24px 32px;
      background: var(--background-default-page-secondary, white);
      box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
      border-radius: 8px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
  
    .tip-number {
      width: 40px;
      height: 40px;
      padding: 4px;
      background: var(--background-inverted-brand-secondary, #F6F2FB);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
  
    .tip-number span {
      color: var(--text-brand-secondary, #A07AD9);
      font-size: 20px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      line-height: 24px;
    }
  
    .tip-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
  
    .tip-title {
      color: var(--text-default, #444955);
      font-size: 18px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      text-transform: capitalize;
      line-height: 24px;
      margin: 0;
    }
  
    .tip-description {
      color: var(--text-secondary, #737780);
      font-size: 14px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      line-height: 16px;
      margin: 0;
    }
  </style>