<script>
    import TextLogo from '$lib/assets/logo/fah-text-logo.svg'
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';

    onMount(() => {
    const t = setTimeout(() => {
        goto('/');
    }, 3000);

    return () => clearTimeout(t);
    });
</script>

<div class="content">
    <div class="slogan title-md">
        Cuz Momma Says We Got...
    </div>

    <div class="logo-container">
        <img src={TextLogo} alt="Food At Home text logo">
    </div>
</div>


<style>
    .content {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }


</style>