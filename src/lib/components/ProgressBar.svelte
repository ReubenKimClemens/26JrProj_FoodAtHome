<script>
    let {
      value = 0,
      max = 100,
      color = '#08F',
      showPercentage = false
    } = $props();
    
    const percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));
</script>
  
<div class="progress-wrap" aria-label="Progress">
    <div 
      class="progress" 
      role="progressbar" 
      aria-valuenow={value} 
      aria-valuemin="0" 
      aria-valuemax={max}
      aria-label="Progress: {Math.round(percentage)}%"
    >
      <div 
        class="progress-bar" 
        style="width: {percentage}%; background: {color}"
      ></div>
    </div>
    
    {#if showPercentage}
      <div class="percentage-text">{Math.round(percentage)}%</div>
    {/if}
</div>
  
  <style>
    .progress-wrap {
      padding: 0px 0 8px 0px;
      width: 100%;
      max-width: 404px;
    }
  
    .progress {
      height: 6px;
      background: rgba(120, 120, 120, 0.20);
      border: 0;
      border-radius: 999px;
      overflow: hidden;
    }
  
    .progress-bar {
      height: 100%;
      border-radius: 999px;
      transition: width 0.3s ease;
    }
  
    .percentage-text {
      margin-top: 8px;
      text-align: right;
      font-size: 14px;
      font-family: 'Nunito', sans-serif;
      font-weight: 600;
      color: var(--text-default, #444955);
    }
  </style>