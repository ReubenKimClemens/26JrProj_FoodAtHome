<script >
    import Buttons from '$lib/components/Buttons.svelte'

    export let layout = "2-column";
    export let defaults = {
    size: "md",
    type: "button",
    block: false
    };

    export let buttons = [
    { label: "Primary", variant: "primary", onClick: () => {} },
    { label: "Secondary", variant: "secondary", onClick: () => {} }
  ];

</script>


<div class={`btn-group btn-group-${layout}`}>
    {#each buttons as btn (btn.key ?? btn.label ?? btn.onClick)}
    <Buttons
        variant={btn.variant ?? defaults.variant ?? "primary"}
        size={btn.size ?? defaults.size ?? "md"}
        type={btn.type ?? defaults.type ?? "button"}
        block={btn.block ?? defaults.block ?? false}
        on:click={btn.onClick}
    >
        {btn.label}
    </Buttons>
    {/each}
</div>

<style>
    .btn-group {
        box-sizing: border-box;
        width: 100%;
    }

    .btn-group-2-column {
        display: flex;
        width: 100%;
        gap: var(--spacing-xs);
    }

    .btn-group-stack {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }
</style>