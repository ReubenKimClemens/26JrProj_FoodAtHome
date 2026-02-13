<script>
	import TextLogo from '$lib/assets/logo/fah-text-logo.svg';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let showText = $state(true);
	let showLogo = $state(true);
	let fadeScreen = $state(false);

	onMount(() => {
		// Phase 1 → Phase 2: fade out text after 2s
		const t1 = setTimeout(() => {
			showText = false;
		}, 2000);

		// Phase 3: fade out entire screen before navigating
		const t2 = setTimeout(() => {
			fadeScreen = true;
		}, 3500);

		// Phase 4: navigate to login
		const t3 = setTimeout(() => {
			goto('/login');
		}, 4200);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	});
</script>

<div class="loading-screen" class:fade-out={fadeScreen}>
	<div class="content">
		<p class="slogan title-md" class:hidden={!showText}>
			Cuz Momma Says We Got...
		</p>

		<div class="logo-container" class:logo-center={!showText}>
			<img src={TextLogo} alt="Food At Home" />
		</div>
	</div>
</div>

<style>
	.loading-screen {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--bg-default);
		transition: opacity 0.6s ease;
	}

	.loading-screen.fade-out {
		opacity: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.slogan {
		color: var(--text-default);
		text-align: center;
		opacity: 1;
		transform: translateY(0);
		transition: opacity 0.8s ease, transform 0.8s ease;
		margin: 0;
	}

	.slogan.hidden {
		opacity: 0;
		transform: translateY(-8px);
	}

	.logo-container {
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.8s ease;
	}

	.logo-container img {
		width: 220px;
		height: auto;
	}
</style>