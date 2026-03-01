<script>
    import ButtonGroup from "$lib/components/ButtonGroup.svelte";
    import { Lightbulb, X, Upload } from 'lucide-svelte';
    import QuestionMark from '$lib/assets/icon_questionmark.svg';
    import Modal from '$lib/components/Modal.svelte';
    import {goto} from '$app/navigation';

    import { getTextFromImage } from '$lib/api/ocr.js';
    import { parseReceipt } from '$lib/controller/receiptParser.js';
    import { compressImage } from '$lib/controller/imageUtils.js';

    let fileInput;
    let selectedImage;
    let imagePreview = $state(null);
    let isScanning = $state(false);
    let scanError = $state('');

    function triggerFileInput() {
        fileInput.click();
    }

    let modalOpen = $state(false);
    let modalTitle = $state('Add New Item');
    let editingItem = $state(null);

    function handleSave(data) {
        goto('/scan/manual-items', { state: { existingItems: $state.snapshot([data]) } });
    }
    
    function handleAdd() {
        editingItem = null;
        modalTitle = 'Add New Item';
        modalOpen = true;
    }

    async function handleImageUpload(event) {
        let file = event.target.files[0];
        if (!file) return;

        imagePreview = URL.createObjectURL(file);
        isScanning = true;
        scanError = '';

        try {
            let smallerFile = await compressImage(file);
            let rawText = await getTextFromImage(smallerFile);
            let receipt = parseReceipt(rawText);

            goto('/scan/scanned-items', {
            state: {
                storeName: receipt.storeName,
                date: receipt.date,
                total: receipt.total,
                items: receipt.items
            }
            });
        } catch (err) {
            scanError = err.message;
        } finally {
            isScanning = false;
        }
    }
    
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
        {#if isScanning}
            <div class="scanning-state">
                <p class="scanning-text">Reading receipt...</p>
            </div>
        {:else if imagePreview}
            <img src={imagePreview} alt="Preview" class="preview-image" />
        {:else}
            <Upload size={50}/>
        {/if}
    </div>

    {#if scanError}
        <p class="error-msg">{scanError}</p>
    {/if}
    
    
    <input
        type="file"
        accept="image/*"
        bind:this={fileInput}
        on:change={handleImageUpload}
        style="display: none;"
    />

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
                { label: "Add Items Manually", variant: "outline", onClick: () => handleAdd() },
                { label: "Upload Receipt", variant: "primary", onClick: triggerFileInput }
                ]}
            />
    </div>
</div>

<Modal 
    bind:open={modalOpen} 
    title={modalTitle}
    initialData={editingItem}
    onAdd={handleSave}
/>
<style>

    .preview-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

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

    .scanning-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-s);
    }

    .scanning-text {
        font-family: var(--font-body);
        color: var(--text-secondary);
        margin: 0;
    }

    .error-msg {
        color: red;
        font-family: var(--font-body);
        font-size: 0.875rem;
        text-align: center;
        margin: 0;
    }
</style>
