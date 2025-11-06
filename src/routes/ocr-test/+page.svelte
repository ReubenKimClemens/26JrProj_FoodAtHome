<script>
    import Tesseract from 'tesseract.js';

    let selectedImage = null;
    let imagePreview = null;
    let scannedText = '';
    let isScanning = false;

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            selectedImage = file;
            imagePreview = URL.createObjectURL(file);
            scannedText = '';
        }
    }

    async function scanReceipt() {
        if (!selectedImage) {
            alert('Please upload an image first!');
            return;
        }

        isScanning = true;
        scannedText = 'Scanning... this may take up to 30 seconds...';

        try {
            const result = await Tesseract.recognize(
                selectedImage,
                'eng',
                {
                    logger: info => console.log(info)
                }
            );

            scannedText = result.data.text;
            console.log('Full result:', result.data);
        }   catch (error) {
            scannedText = 'Error scanning image: ' + error.message;
            console.error(error);
        }   finally {
            isScanning = false;
        }
    }
</script>

<div class="container">
    <h1>Food At Home - Receipt Scanner [TEST]</h1>

    <div class="upload-section">
        <label for="receipt-upload" class="upload-label">
            Choose Receipt Image 
        </label>
        <input
            id="receipt-upload"
            type="file"
            accept="image/*"
            onchange={handleImageUpload}
        />
    </div>

    {#if imagePreview}
        <div class="preview-section">
            <h2>Preview:</h2>
            <img src={imagePreview} alt="Receipt preview" />
        </div>
    {/if}

    {#if selectedImage}
        <button onclick={scanReceipt} disabled={isScanning}>
            {isScanning ? 'Scanning...' : 'Scan Receipt'}
        </button>
    {/if}

    {#if scannedText}
        <div class="result-section">
            <h2>Scanned Text:</h2>
            <textarea
                readonly
                value={scannedText}
                rows="15"
            ></textarea>
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        font-family: Arial, sans-serif;
    }

    h1 {
        color: #567766;
        margin-bottom: 2rem;
    }

    .upload-section {
        margin-bottom: 2rem;
    }

    .upload-label {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: #0C8CE9;
        color: #FFFBF0;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .upload-label:hover {
        background-color: #218838;
    }

    input[type="file"] {
        display: none;
    }

    .preview-section {
        margin: 2rem 0;
    }

    .preview-section img {
        max-width: 100%;
        max-height: 400px;
        border: 2px solid #50CC8B;
        border-radius: 8px;
    }

    button {
        padding: 1rem 2rem;
        background-color: #0C8CE9;
        color: #FFFBF0;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover:not(:disabled) {
        background-color: #218838;
    }

    button:disabled {
        background-color: #e0e0e0;
        cursor: not-allowed;
    }

    .result-section {
        margin-top: 2rem;
    }

    textarea {
        width: 100%;
        padding: 1rem;
        font-family: monospace;
        font-size: 0.9rem;
        border: 2px solid #F316B0;
        border-radius: 8px;
        resize: vertical;
    }

    h2 {
        color: #7E57C2;
        margin-bottom: 1rem;
    }
</style>