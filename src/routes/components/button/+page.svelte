<!-- button usage -->

<!-- still need to create event onclick -->

<script>
    import Button from "$lib/components/Button.svelte"
    import ButtonGroup from "$lib/components/ButtonGroup.svelte"
    import Buttons from "$lib/components/Buttons.svelte"
</script>

<div class="content">

    <!-- individual button
    variant: primary, secondary, outline, danger
    size: md, lg
    block = true -> full-width
    type: button, submit if needed -->
    
    <div class="buttons">
    <Buttons variant="primary" size="md" >Button</Buttons>
    <Buttons variant="secondary" size="md">Button</Buttons>
    <Buttons variant="outline" size="md">Button</Buttons>
    <Buttons variant="danger" size="md">Button</Buttons>

    <Buttons variant="primary" size="lg" block>Button</Buttons>
    <Buttons variant="secondary" size="lg" block>Button</Buttons>
    <Buttons variant="danger" size="lg" block>Button</Buttons>
    </div>

    <ButtonGroup
        layout="2-column"
        defaults={{ size: "md", block: true }}
        buttons={[
        { label: "Primary", variant: "primary", onClick: () => console.log("1st button") },
        { label: "Secondary", variant: "outline", onClick: () => console.log("2nd button") }
        ]}
    />

    <!-- group button 
     layout: 2-column, stack
     label: for button
     variant: use as the individual button
     -->

    <ButtonGroup
        layout="stack"
        buttons={[
        { label: "Primary", variant: "primary", onClick: () => console.log("1st button") },
        { label: "Secondary", variant: "secondary", onClick: () => console.log("2nd button") }
        ]}
    />


</div>

<style>
    .content {
        background: lightgrey; 
        display: flex;
        padding: 2rem;
        flex-direction: column;
        gap: 2rem;
    }

    .buttons {
        display: grid;
        gap: 1rem;
    }

    
</style>