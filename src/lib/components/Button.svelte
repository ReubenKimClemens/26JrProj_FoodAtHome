<script>
    let buttonText = 'Button';
    let Type = 'primary';
</script>

<button class="primary title-sm">{buttonText}</button>

<style>
    button {
        cursor: pointer;
        margin: 1rem;
    }

    .primary {
        display: flex;
        width: 11.28125rem;
        height: 2.5rem;
        justify-content: center;
        align-items: center;

        color: var(--text-on-action, #FFF);
        background: var(--bg-brand-primary);
        text-align: center;

        border-radius: var(--radius-rounded, 0.5rem);
        border: none;        
    }

    .secondary {
        background: var(--bg-brand-secondary);
    }
</style>
