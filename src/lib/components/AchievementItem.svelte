<script>
    import BagImage from '$lib/assets/achievements/bag.png';

    let {
        achievementImage = BagImage,
        achievementName = 'Do you have FAH?',
        achievementState = 'active'
    } = $props();
</script>

<div class="achievement-item {achievementState}">
    <img class="img" src={achievementImage} alt="{achievementName}"/>
    <div class="title">{achievementName}</div>
</div>

<style>
    .active {
        opacity: 1;
    }
    .inactive {
        opacity: .5;
    }

.title {
    color: var(--text-default);
    font-size: 16px;
    font-family: var(--font-body);
    font-weight: 700;
    text-align: center;
}

.img {
    width: 110px;
    height: 110px;
}

.achievement-item {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    display: flex;
}
</style>