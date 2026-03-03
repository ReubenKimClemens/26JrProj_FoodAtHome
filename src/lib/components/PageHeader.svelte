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
    <h1 class="title-lg">{greeting()}</h1>
  </div>
</header>
