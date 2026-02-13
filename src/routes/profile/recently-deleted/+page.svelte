<script>

    import { MoveLeft } from 'lucide-svelte';
    import {goto} from '$app/navigation';

    let leadingIcon = 'true';
    let trailingIcon = 'false';

</script>

<div class="content">

    <div class="top-nav">
        <button class="icon-btn" on:click={() => goto('/profile')} >
            <MoveLeft/>
        </button>

        <span class="title title-lg">Recently Deleted Items</span>
    </div>

    <!-- recently deletd items here -->
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

