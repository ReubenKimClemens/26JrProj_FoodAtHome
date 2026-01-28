<script>
    import { goto } from '$app/navigation';
    import UserIcon from '$lib/assets/icon_profile_edit.svg';
    import NotificationIcon from '$lib/assets/icon_notifications.svg';
    import LogoutIcon from '$lib/assets/icon_logout.svg';
    import ChevronRight from '$lib/assets/chevron_right.svg';
    import Divider from '$lib/components/Divider.svelte';
    
    let {
      onSignOut = () => {}
    } = $props();
    
    const settings = $derived([
      {
        id: 'profile',
        label: 'Profile',
        icon: UserIcon,
        action: () => goto('/profile')
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: NotificationIcon,
      },
      {
        id: 'signout',
        label: 'Sign Out',
        icon: LogoutIcon,
      }
    ]);
    
    function handleSettingClick(setting) {
      setting.action();
    }
  </script>
  
  <div class="settings-container">
    {#each settings as setting, index}
      <button 
        class="setting-item"
        onclick={() => handleSettingClick(setting)}
        aria-label={setting.label}
      >
        <div class="setting-content">
          <img src={setting.icon} alt="" class="setting-icon" />
          <span class="setting-label">{setting.label}</span>
        </div>
        <img src={ChevronRight} alt="" class="chevron-icon" />
      </button>
      
      {#if index < settings.length - 1}
        <Divider />
      {/if}
    {/each}
</div>
  
<style>
    .settings-container {
      padding: 8px 32px;
      background: var(--background-default-page-secondary, white);
      box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      margin: 24px 0;
    }
  
    .setting-item {
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
    }
  
    .setting-content {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
    }
  
    .setting-icon {
      width: 18px;
      height: 18px;
      object-fit: contain;
    }
  
    .setting-label {
      color: var(--text-default, #444955);
      font-size: 16px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      line-height: 20px;
    }
</style>