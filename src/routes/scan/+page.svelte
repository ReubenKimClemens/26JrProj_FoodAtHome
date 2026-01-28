<script>
    import ButtonGroup from "$lib/components/ButtonGroup.svelte";
    import { Lightbulb } from 'lucide-svelte';
    import { Camera } from 'lucide-svelte';
    import { MoveLeft } from 'lucide-svelte';
    import QuestionMark from '$lib/assets/icon_questionmark.svg';
    import { X } from 'lucide-svelte';
    import {goto} from '$app/navigation';
</script>

<div class="content">

    <div class="top-nav">
        <button on:click={() => goto('/')} class="back-btn">
            <X size={30}/>
        </button>
        

        <button class="help-btn" on:click={() => goto('/scan/scanning-tips')}>

            <img src={QuestionMark} alt="help button">
        </button>
        

    </div>
    

    <div class="scan-camera">
        <Camera size={50}/>
    </div>
    
    <div class="bottom-wrapper">
    
        <div class="tips-container">
            <Lightbulb />
            <div class="tips body-md">
                <strong>Tips:</strong>
                <span>Bright light works best</span>
            </div>
        </div>
        
        <ButtonGroup
                layout="2-column"
                defaults={{ size: "md", block: true }}
                buttons={[
                { label: "Add Items Manually", variant: "outline", onClick: () => console.log("1st button") },
                { label: "Scan Receipt", variant: "primary", onClick: () => console.log("2nd button") }
                ]}
            />
    </div>
</div>


<style>
    .content {
        height: calc(100vh - 96px);
        padding: var(--spacing-s);
        margin-top: var(--spacing-md);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .top-nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .help-btn{
        cursor: pointer;
        border: none;
        background: transparent;
    }
    .back-btn{
        cursor: pointer;
        border: none;
        background: transparent;
    }

    .tips-container {
        display: flex;
        justify-content: center;
        gap: var(--spacing-xs);
        align-items: center;
    }

    .bottom-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-s);
    }

    .scan-camera {
        height: 50vh;
        width: 80%;

        border: 5px dashed var(--bg-brand-primary);
        border-radius: var(--radius-rounded);

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
