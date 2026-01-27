<script>
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-container">
	{@render children()}
	
	<NavigationBar />
</div>

<style>
	.app-container {
		max-width: 402px; /* iPhone 14 Pro Max width, adjust as needed */
		margin: 0 auto;
		min-height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
	}
</style>