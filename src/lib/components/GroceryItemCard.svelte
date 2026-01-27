<script>
    import { createEventDispatcher } from 'svelte';
    import DragIcon from '$lib/assets/dragIndicator.svg';
    
    let { label = 'Item', checked = false, id = 'item-id' } = $props();
    
    const dispatch = createEventDispatcher();
    
    function handleChange() {
        dispatch('change', { checked, label });
    }
</script>

<div class="item">
    <img src={DragIcon} alt="" width="16" height="16" />
    
    <input 
        type="checkbox" 
        {id}
        bind:checked
        onchange={handleChange}
        class="hidden-input"
    />
    
    <label for={id} class="label">
        <span class="circle" class:checked></span>
        <span class="text" class:checked>{label}</span>
    </label>
</div>

<style>
    .item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #cdced1;
        font-family: var(--font-body);
    }

    .hidden-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        flex: 1;
        user-select: none;
    }
    
    .circle {
        width: 24px;
        height: 24px;
        border: 2px solid #ddd;
        border-radius: 50%;
        flex-shrink: 0;
        position: relative;
    }
    
    .circle.checked {
        border-color: var(--color-green-100);
    }
    
    .circle.checked::before {
        content: '';
        position: absolute;
        inset: 4px;
        background: var(--color-green-100);
        border-radius: 50%;
    }
    
    .text {
        font-size: var(--font-title-md-size);
        color: #333;
    }
    
    .text.checked {
        color: #999;
        text-decoration: line-through;
    }
</style>