<script>
    import AchievementItem from '$lib/components/AchievementItem.svelte';
    
    let { achievements = []} = $props();

    /*
    This is what an example achievement object looks like:
    {
        img: Bag,
        id: 'Do you have FAH?',
        state: 'active'
    }
    You can use this variable on the page to pass in an 
    array of achievement objects to display in the grid.

    let allAchievements = [{img: Bag, name: 'Do you have FAH?', state: 'active'}, {img: Orange, name: 'Wise Head', state: 'inactive'}, {img: Star, name: 'Getting Started', state: 'active'},{img: Tomato, name: 'First Item', state: 'active'},{img: Receipt, name: 'Receipt Warrior', state: 'active'},{img: Broccoli, name: 'Chomp Machine', state: 'active'}];

    */
</script>

<div class="achievement-grid">
    {#each achievements as achievement}
        <AchievementItem 
            achievementImage={achievement.img}
            achievementName={achievement.id}
            achievementState={achievement.state}
        />
    {/each}
</div>

<style>
    .achievement-grid {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(3, 100px);
        gap: 8px;
        width: 100%;
    }
</style>