<script>
    import Bag from '$lib/assets/achievements/bag.png';
    import Broccoli from '$lib/assets/achievements/broccoli.png';
    import Orange from '$lib/assets/achievements/orange.png';
    import Receipt from '$lib/assets/achievements/receipt.png';
    import Star from '$lib/assets/achievements/star.png';
    import Tomato from '$lib/assets/achievements/tomato.png';

    import { MoveLeft } from 'lucide-svelte';
    import {goto} from '$app/navigation';

    import AchievementGrid from '$lib/components/AchievementGrid.svelte';
    // import AchievementItem from '$lib/components/AchievementItem.svelte';

    let leadingIcon = 'true';
    let trailingIcon = 'false';

    let allAchievements = [{img: Bag, name: 'Do you have FAH?', state: 'active'}, {img: Orange, name: 'Wise Head', state: 'inactive'}, {img: Star, name: 'Getting Started', state: 'active'},{img: Tomato, name: 'First Item', state: 'active'},{img: Receipt, name: 'Receipt Warrior', state: 'active'},{img: Broccoli, name: 'Chomp Machine', state: 'active'}];

</script>

<div class="content">

    <div class="top-nav">
        <button class="icon-btn" on:click={() => goto('/profile')} >
            <MoveLeft/>
        </button>

        <span class="title title-lg">Achievements</span>
    </div>

    <AchievementGrid achievements={allAchievements} />
</div>

<style>
    .content {
        height: calc(100vh - 96px);
        padding: var(--spacing-s);
        margin-top: var(--spacing-md);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
    }

    .top-nav {
        width: 100%;
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        align-items: center;
    }

    .top-nav .title {
        justify-self: center;
        text-align: center;
    }

    .icon-btn {
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        background: none;
        border: none;
        padding: 0;
    }

</style>

