<script>
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/app.css';
	import { page } from '$app/stores';

	let { children } = $props();

	const noNavBar = ['/loading', 'login', '/scan', '/achievements'];
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
	background-color: var(--bg-page-primary);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.content-wrapper {
	padding-bottom: 120px;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	}
</style>