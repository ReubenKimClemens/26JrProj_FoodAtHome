<script>
    let {
      title = '',
      userName = 'Cronch'
    } = $props();
    
    const greeting = $derived(() => {
      if (title) return title;
      
      const hour = new Date().getHours();
      let timeGreeting = '';
      
      if (hour >= 5 && hour < 12) {
        timeGreeting = 'Good morning';
      } else if (hour >= 12 && hour < 17) {
        timeGreeting = 'Good afternoon';
      } else if (hour >= 17 && hour < 21) {
        timeGreeting = 'Good evening';
      } else {
        timeGreeting = 'Good night';
      }
      
      return `${timeGreeting} ${userName}!`;
    });
  </script>
  
  <header class="page-header">
    <div class="header-content">
      <h1 class="header-title">{greeting()}</h1>
    </div>
  </header>
  
  <style>
    .page-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .header-content {
      height: 48px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  
    .header-title {
      color: var(--text-default, #444955);
      font-size: 24px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      text-transform: capitalize;
      line-height: 32px;
      margin: 0;
    }
  </style>