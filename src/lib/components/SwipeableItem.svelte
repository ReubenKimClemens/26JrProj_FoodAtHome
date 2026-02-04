<script>
    import InventoryItemCard from '$lib/components/InventoryItemCard.svelte';
    import tossIcon from '$lib/assets/toss.svg';
    import chompIcon from '$lib/assets/chomp.svg';
    
    let { 
        itemName = '2% Milk', 
        quantity = 1, 
        category = 'Dairy', 
        addedDaysAgo = 2, 
        onToss = () => {}, 
        onChomp = () => {},
        onTap = null
    } = $props();
    
    let offsetX = $state(0);
    let startX = $state(0);
    let isDragging = $state(false);
    let hasMoved = $state(false);
    const THRESHOLD = 100;
    
    function onPointerDown(e) {
        isDragging = true;
        hasMoved = false;
        startX = e.clientX - offsetX;
    }
    
    function onPointerMove(e) {
        if (!isDragging) return;
        const newOffset = Math.min(200, Math.max(e.clientX - startX, -200));

        if (Math.abs(newOffset - offsetX) > 5) {
            hasMoved = true;
        }
        
        offsetX = newOffset;
    }
    
    function onPointerUp() {
        isDragging = false;
        
        if (offsetX > 75) {
            onToss();
        } else if (offsetX < -75) {
            onChomp();
        } else {
            offsetX = 0;
        }
    }

    function handleTap(e) {
        if (!hasMoved && onTap && offsetX === 0) {
            onTap();
        }
    }
</script>

<svelte:window onpointermove={onPointerMove} onpointerup={onPointerUp} />

<div class="container">
    <div class="left-action">
        <button class="toss-btn" onclick={onToss}>
            <img src={tossIcon} alt="" />
            Toss
        </button>
    </div>
    
    <div 
        class="content"
        style="transform: translateX({offsetX}px); transition: {isDragging ? 'none' : 'transform 0.3s'};"
        onpointerdown={onPointerDown}
        onclick={handleTap}
    >
        <InventoryItemCard {itemName} {quantity} {category} {addedDaysAgo} />
    </div>
    
    <div class="right-action">
        <button class="chomp-btn" onclick={onChomp}>
            <img src={chompIcon} alt="" />
            Chomp
        </button>
    </div>
</div>

<style>
    .container {
        position: relative;
        margin-bottom: 12px;
    }
    
    .content {
        position: relative;
        cursor: grab;
        z-index: 2;
        touch-action: pan-y;
    }
    
    .content:active { cursor: grabbing; }
    
    .left-action, .right-action {
        position: absolute;
        top: 0;
        height: 100%;
        width: 200px;
        z-index: 1;
        overflow: hidden;
    }
    
    .left-action { left: 0; }
    .right-action { right: 0; }
    
    button {
        width: 100%;
        height: 100%;
        border: none;
        color: white;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-family: var(--font-body);
    }
    
    .toss-btn {
        background: #FF4040;
        border-radius: var(--radius-rounded) 0 0 var(--radius-rounded);
    }
    
    .chomp-btn {
        background: #FF9040;
        border-radius: 0 var(--radius-rounded) var(--radius-rounded) 0;
    }
    
    img { width: 24px; height: 24px; }
</style>