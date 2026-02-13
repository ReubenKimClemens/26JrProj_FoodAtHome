<script>
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/app.css';
	import { page } from '$app/stores';

	let { children } = $props();

	const noNavBar = ['/loading', '/login', '/scan', '/achievements'];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-container">
	<div class="content-wrapper">
		{@render children()}
	</div>

	{#if !noNavBar.includes($page.url.pathname)}
		<NavigationBar />
	{/if}
</div>

<style>
	.app-container {
		max-width: 402px; 
		margin: 0 auto;
		min-height: 100vh;
		position: relative;
	}

	.content-wrapper {
		padding-bottom: 120px; 
	}
</style>