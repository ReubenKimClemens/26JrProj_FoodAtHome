<script>
    import SearchIcon from '$lib/assets/icon_search.svg';

    let {
        value = $bindable(''),
        placeholder = 'Search...'
    } = $props();
</script>

<div class="search-bar">
    <img src={SearchIcon} alt="" class="search-icon" />
    <input
        type="text"
        class="body-md"
        {placeholder}
        bind:value
    />
    {#if value}
        <button class="clear-btn" onclick={() => value = ''} aria-label="Clear search">
            ✕
        </button>
    {/if}
</div>

<style>
    .search-bar {
        display: flex;
        width: 370px;
        height: 40px;
        min-width: 120px;
        padding: 8px 16px;
        align-items: center;
        gap: 8px;
        border-radius: 9999px;
        border: 1px solid var(--border-default, #DADBDD);
        background: var(--bg-page-secondary, #FFFFFF);
        box-sizing: border-box;
    }

    .search-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        opacity: 0.4;
    }

    input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        color: var(--text-default, #444955);
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        line-height: 20px;
    }

    input::placeholder {
        color: var(--text-subtle, #AAADB3);
    }

    .clear-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-subtle, #AAADB3);
        font-size: 12px;
        padding: 0;
        line-height: 1;
        flex-shrink: 0;
        transition: color 0.2s ease;
    }

    .clear-btn:hover {
        color: var(--text-default, #444955);
    }
</style>