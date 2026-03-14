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
    let swipedDirection = $state(null);

    const SWIPE_THRESHOLD = 60;
    const SNAP_OFFSET = 120;
    const LOCK_AXIS_THRESHOLD = 10;
    let axisLocked = $state(null);
    
    function onPointerDown(e) {
        isDragging = true;
        hasMoved = false;
        axisLocked = null;
        startX = e.clientX;
        startY = e.clientY;
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
            const base = swipedDirection === 'toss' ? SNAP_OFFSET 
                       : swipedDirection === 'chomp' ? -SNAP_OFFSET : 0;
            offsetX = Math.max(-SNAP_OFFSET, Math.min(SNAP_OFFSET, base + dx));
        }
    }
    
    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;

        if (axisLocked === 'x') {
            if (offsetX > SWIPE_THRESHOLD) {
                swipedDirection = 'toss';
                offsetX = SNAP_OFFSET;
            } else if (offsetX < -SWIPE_THRESHOLD) {
                swipedDirection = 'chomp';
                offsetX = -SNAP_OFFSET;
            } else {
                swipedDirection = null;
                offsetX = 0;
            }
        }
    }

    function handleCardTap() {
        if (!hasMoved && swipedDirection) {
            swipedDirection = null;
            offsetX = 0;
        } else if (!hasMoved && onTap) {
            onTap();
        }
    }

    function handleToss() {
        swipedDirection = null;
        offsetX = 0;
        onToss();
    }

    function handleChomp() {
        swipedDirection = null;
        offsetX = 0;
        onChomp();
    }
</script>

<svelte:window onpointermove={onPointerMove} onpointerup={onPointerUp} />

<div class="clip-wrapper">
    <div class="swipe-row" style="transform: translateX({offsetX}px); transition: {isDragging ? 'none' : 'transform 0.3s ease'};">
        <button class="toss-btn action-btn" onclick={handleToss}>
            <img src={tossIcon} alt="" />
            Toss
        </button>

        <div 
            class="content"
            onpointerdown={onPointerDown}
            onclick={handleCardTap}
            role="button"
            tabindex="0"
        >
            <InventoryItemCard {itemName} {quantity} {category} {addedDaysAgo} />
        </div>

        <button class="chomp-btn action-btn" onclick={handleChomp}>
            <img src={chompIcon} alt="" />
            Chomp
        </button>
    </div>
</div>

<style>
    .clip-wrapper {
        overflow: hidden;
        margin-bottom: 12px;
        border-radius: var(--radius-rounded);
        box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    }

    .swipe-row {
        display: flex;
        align-items: stretch;
    }

    .content {
        flex: 1;
        cursor: grab;
        touch-action: pan-y;
        min-width: 0;
    }

    .content:active { cursor: grabbing; }

    .action-btn {
        width: 120px;
        flex-shrink: 0;
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
        margin-left: -120px;
        order: -1;
    }

    .chomp-btn {
        background: #FF9040;
        border-radius: 0 var(--radius-rounded) var(--radius-rounded) 0;
        margin-right: -120px;
    }

    img { width: 24px; height: 24px; }
</style>