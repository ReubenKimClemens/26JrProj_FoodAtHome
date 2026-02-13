<script>
    import { goto } from '$app/navigation';
    import UserIcon from '$lib/assets/icon_profile_edit.svg';
    import NotificationIcon from '$lib/assets/icon_notifications.svg';
    import LogoutIcon from '$lib/assets/icon_logout.svg';
    import ChevronRight from '$lib/assets/chevron_right.svg';
    import Divider from '$lib/components/Divider.svelte';
    import trash from '$lib/assets/trash.svg'

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
        id: 'recently-deleted',
        label: 'Recently Deleted Items',
        icon: trash,
        action: () => goto('/profile/recently-deleted')
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
      if (setting.action) {
        setting.action();
      }
    }
</script>

<div class="settings-wrapper">
    <div class="header">
        <span class="header-title">Settings</span>
    </div>
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
</div>

<style>
    .settings-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 24px 0;
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

    .settings-container {
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

    .chevron-icon {
        width: 24px;
        height: 24px;
    }
</style>
