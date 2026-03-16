<script>
    import PageHeader from '$lib/components/PageHeader.svelte';
    import ScanningTips from '$lib/components/ScanningTips.svelte';

    import { ChevronLeft } from 'lucide-svelte';
    import { MoveLeft } from 'lucide-svelte';
    import { goto } from '$app/navigation';


</script>

<div class="content">

    <div class="heading">
        <button onclick={() => goto('../scan')}>
            <MoveLeft />
        </button>
    
        <PageHeader title="Help" />
    </div>
    
    <ScanningTips />
</div>

<style>
.content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

button {
    width: 40px;
    height: 40px;
    padding: 0;
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--icons-default);

    position: absolute;
    left: 0;
    z-index: 100;
}

.heading {
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
}

</style>

