<script>
    import SectionCard from '$lib/components/SectionCard.svelte';
    import Divider from '$lib/components/Divider.svelte';
    import ChevronRight from '$lib/assets/chevron-right.svg'
    import IconArrowBack from '$lib/assets/icon_arrow_back.svg';
    import IconPlus from '$lib/assets/icon_plus.svg';
</script>

<div class="top-nav">
    <a href="/" class="nav-icon-left">
        <img src={IconArrowBack} alt="Back" />
    </a>
    <div class="title">
        <span class="title_span">shopping lists</span>
    </div>
    <button class="nav-icon-right">
        <img src={IconPlus} alt="Add" />
    </button>
</div>

<style>
    .top-nav {
        width: 100%;
        height: 32px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        margin: 24px 0 0;
    }
    
    .nav-icon-left {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }
    
    .nav-icon-right {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }
    
    .title_span {
        color: var(--text-default, #444955);
        font-size: 24px;
        font-family: Quicksand;
        font-weight: 700;
        text-transform: capitalize;
        line-height: 32px;
        word-wrap: break-word;
    }
</style>