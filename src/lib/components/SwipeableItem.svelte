<script>
    import InventoryItemCard from '$lib/components/InventoryItemCard.svelte';
    import tossIcon from '$lib/assets/icon_trash_white.svg';
    import chompIcon from '$lib/assets/icon_chomp.svg';
    
    let { 
        itemName = '2% Milk', 
        quantity = 1, 
        category = 'Dairy', 
        addedDaysAgo = 2, 
        onToss = () => {}, 
        onChomp = () => {},
        onTap = null
    } = $props();
    
    let startX = $state(0);
    let startY = $state(0);
    let isDragging = $state(false);
    let hasMoved = $state(false);
    let offsetX = $state(0);

    const SWIPE_THRESHOLD = 60;
    const LOCK_AXIS_THRESHOLD = 10;
    let axisLocked = $state(null);
    
    function onPointerDown(e) {
        isDragging = true;
        hasMoved = false;
        axisLocked = null;
        startX = e.clientX;
        startY = e.clientY;
        offsetX = 0;
    }
    
    function onPointerMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!axisLocked) {
            if (Math.abs(dx) > LOCK_AXIS_THRESHOLD || Math.abs(dy) > LOCK_AXIS_THRESHOLD) {
                axisLocked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
            }
        }

        if (axisLocked === 'x') {
            hasMoved = true;
            e.preventDefault();
            offsetX = Math.max(-150, Math.min(150, dx));
        }
    }
    
    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;

        if (axisLocked === 'x') {
            if (offsetX > SWIPE_THRESHOLD) {
                onToss();
            } else if (offsetX < -SWIPE_THRESHOLD) {
                onChomp();
            }
        }

        offsetX = 0;
    }

    function handleTap() {
        if (!hasMoved && onTap) {
            onTap();
        }
    }
</script>

<svelte:window onpointermove={onPointerMove} onpointerup={onPointerUp} />

<div class="container">
    <div class="action-panel left">
        <button class="toss-btn">
            <img src={tossIcon} alt="" />
            Toss
        </button>
    </div>

    <div 
        class="content"
        style="transform: translateX({offsetX}px); transition: {isDragging ? 'none' : 'transform 0.3s ease'};"
        onpointerdown={onPointerDown}
        onclick={handleTap}
        role="button"
        tabindex="0"
    >
        <InventoryItemCard {itemName} {quantity} {category} {addedDaysAgo} />
    </div>

    <div class="action-panel right">
        <button class="chomp-btn">
            <img src={chompIcon} alt="" />
            Chomp
        </button>
    </div>
</div>

<style>
    .container {
        position: relative;
        margin-bottom: 12px;
        overflow: hidden;
        border-radius: var(--radius-rounded);
        box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    }

    .content {
        position: relative;
        cursor: grab;
        z-index: 2;
        touch-action: pan-y;
    }

    .content:active { cursor: grabbing; }

    .action-panel {
        position: absolute;
        top: 0;
        height: 100%;
        width: 150px;
        z-index: 1;
    }

    .action-panel.left  { left: 0; }
    .action-panel.right { right: 0; }

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