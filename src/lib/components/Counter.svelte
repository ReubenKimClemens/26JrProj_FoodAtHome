<script>

    
    import { Plus, Minus } from 'lucide-svelte';

    let count = 1;

    function increment() {
        count += 1;
    }

    function decrement() {
        if (count > 1) count -= 1;
    }
</script>

<div class="content">
    <div class="counter-container">
        <button type="button" on:click={decrement} aria-label="Decrease">
            <Minus size={18} />
        </button>

        <input
            class="count-input body-lg"
            type="number"
            bind:value={count}
            min="0"
            aria-label="Count"
        >

        <button type="button" on:click={increment} aria-label="Increase">
            <Plus size={18} />
        </button>
    </div>
</div>

<style>
    .counter-container {
        width: 100%;
        min-width: 6.75rem;
        height: 2.75rem;

        display: inline-flex;
        align-items: center;
        justify-content: space-around;

        background-color: var(--bg-page-secondary);
        border: 1px solid var(--border-secondary);
        border-radius: var(--radius-rounded)
    }

    button {
        background: var(--bg-page-secondary);
        border: none;
        color: var(--icons-default);
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-full);
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .count-input {
        width: 3ch;
        text-align: center;
        color: var(--text-default);
        border: none;
        outline: none;
    }

    .count-input::-webkit-outer-spin-button,
    .count-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .count-input[type='number'] {
        -moz-appearance: textfield;
    }
</style>
