<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  // 🟢 Active States
  import homeActive from '$lib/assets/nav_home_active.svg';
  import homeInactive from '$lib/assets/nav_home_inactive.svg';
  import inventoryActive from '$lib/assets/nav_inventory_active.svg';
  import inventoryInactive from '$lib/assets/nav_inventory_inactive.svg';
  import receipt from '$lib/assets/nav_receipt.svg';
  import metricsActive from '$lib/assets/nav_metrics_active.svg';
  import metricsInactive from '$lib/assets/nav_metrics_inactive.svg';
  import profileActive from '$lib/assets/nav_profile_active.svg';
  import profileInactive from '$lib/assets/nav_profile_inactive.svg';

  const navItems = [
    { 
      id: 'Home', 
      label: 'Home', 
      path: '/',
      iconActive: homeActive,
      iconInactive: homeInactive
    },
    { 
      id: 'Inventory', 
      label: 'Inventory', 
      path: '/inventory',
      iconActive: inventoryActive,
      iconInactive: inventoryInactive
    },
    { 
      id: 'Scan', 
      label: 'Scan', 
      path: '/scan',
      icon: receipt 
    },
    { 
      id: 'Metrics', 
      label: 'Metrics', 
      path: '/metrics',
      iconActive: metricsActive,
      iconInactive: metricsInactive
    },
    { 
      id: 'Profile', 
      label: 'Profile', 
      path: '/profile',
      iconActive: profileActive,
      iconInactive: profileInactive
    }
  ];

  function handleNavClick(path) {
    goto(path);
  }

  function isActive(item) {
    return $page.url.pathname === item.path;
  }

  function getIcon(item) {
    if (item.id === 'Scan') return item.icon;
    return isActive(item) ? item.iconActive : item.iconInactive;
  }
</script>

<nav class="navbar">
  {#each navItems as item}
    <button 
      class="nav-item" 
      class:active={isActive(item)}
      class:scan={item.id === 'Scan'}
      onclick={() => handleNavClick(item.path)}
      aria-label={item.label}
      aria-current={isActive(item) ? 'page' : undefined}
    >

      <div class="icon-wrapper" class:scan-icon={item.id === 'Scan'}>
        <img src={getIcon(item)} alt={item.label} class="nav-icon" />
      </div>
      <span class="nav-label">{item.label}</span>
    </button>
  {/each}
</nav>

<style>
  .navbar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 100%;
    max-width: 420px;
    height: 96px;
    padding: var(--spacing-s) var(--spacing-lg);
    justify-content: space-between;
    align-items: flex-end;
    background: var(--color-bg-default-light);
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06);
    z-index: 100;
    box-sizing: border-box;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2xs);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;
  }
    
  .nav-label {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-default, #374151);
    transition: color 0.2s ease;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    transition: all 0.2s ease;
  }

  .scan-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--bg-brand-primary, #10B981);
  }

  .scan-icon .nav-icon {
    width: 32px;
    height: 32px;
    filter: brightness(0) invert(1);
  }
</style>