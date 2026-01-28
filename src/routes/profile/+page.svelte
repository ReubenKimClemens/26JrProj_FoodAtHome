<script>
    import PageHeader from '$lib/components/PageHeader.svelte';
    import HowToUse from '$lib/components/HowToUse.svelte';
    import Settings from '$lib/components/Settings.svelte';
    import SectionCard from '$lib/components/SectionCard.svelte';
    
    import BagIcon from '$lib/assets/achievements/bag.png';
    import BroccoliIcon from '$lib/assets/achievements/broccoli.png';
    import ReceiptIcon from '$lib/assets/achievements/receipt.png';
    
    const achievements = $state([
        { id: 'bag', icon: BagIcon, label: 'Do you have FAH?' },
        { id: 'broccoli', icon: BroccoliIcon, label: 'Chomp Machine' },
        { id: 'receipt', icon: ReceiptIcon, label: 'Receipt Warrior' }
    ]);
</script>

<PageHeader title="Profile" />

<!-- Achievements -->
<SectionCard title="Achievements" linkText="View All" linkHref="/achievements">
    {#snippet content()}
        <div class="achievements-content">
            {#each achievements as achievement}
                <div class="achievement-item">
                    <img src={achievement.icon} alt={achievement.label} class="achievement-icon" />
                    <span class="achievement-label">{achievement.label}</span>
                </div>
            {/each}
        </div>
    {/snippet}
</SectionCard>

<HowToUse />
<Settings />

<style>
.achievements-content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 16px;
}

.achievement-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.achievement-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
}

.achievement-label {
    color: var(--text-default, #444955);
    font-size: 14px;
    font-family: Nunito;
    font-weight: 600;
    text-align: center;
}
</style>