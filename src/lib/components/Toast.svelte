<script>
    import { fade, fly } from 'svelte/transition';

    let {
        message = '',
        show = $bindable(false),
        onUndo = null,
        duration = 4000
    } = $props();

    let timer;

    $effect(() => {
        if (show) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                show = false;
            }, duration);
        }
        return () => clearTimeout(timer);
    });
</script>

{#if show}
    <div
        class="toast"
        transition:fly={{ y: 40, duration: 250 }}
        role="status"
        aria-live="polite"
    >
        <span class="toast-message">{message}</span>
        {#if onUndo}
            <button class="undo-btn" onclick={() => { onUndo(); show = false; }}>
                Undo
            </button>
        {/if}
    </div>
{/if}

<style>
.toast {
        position: fixed;
        bottom: 125px;
        left: 50%;
        transform: translateX(-50%);
        background: #FFFFFF;
        color: #0FA376;
        padding: 12px 20px;
        border-radius: 8px;
        outline: 1px #0FA376 solid;
        outline-offset: -1px;
        box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 2000;
        white-space: nowrap;
    }

    .toast-message {
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        font-weight: 600;
    }

    .undo-btn {
        background: none;
        border: none;
        color: #0FA376;
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        padding: 0;
    }
</style>