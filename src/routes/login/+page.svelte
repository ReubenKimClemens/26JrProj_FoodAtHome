<script>
	import TextLogo from '$lib/assets/logo/fah-text-logo.svg';
	import { goto } from '$app/navigation';

	let isLogin = $state(true);
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let visible = $state(false);

	import { onMount } from 'svelte';
	onMount(() => {
		setTimeout(() => (visible = true), 50);
	});

	function toggleMode() {
		isLogin = !isLogin;
		email = '';
		password = '';
		confirmPassword = '';
	}

	async function handleSubmit() {
		if (isLogin) {
			goto('/');
		} else {
			goto('/');
		}
	}

	function continueAsGuest() {
		goto('/');
	}
</script>

<div class="login-screen" class:visible>
	<div class="top-section">
		<img src={TextLogo} alt="Food At Home" class="logo" />
	</div>

	<div class="card">
		<div class="tab-row">
			<button
				class="tab body-md-bold"
				class:active={isLogin}
				onclick={() => (isLogin = true)}
			>
				Log In
			</button>
			<button
				class="tab body-md-bold"
				class:active={!isLogin}
				onclick={() => (isLogin = false)}
			>
				Sign Up
			</button>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
			<div class="field">
				<label class="body-sm-bold" for="email">Email</label>
				<input
					id="email"
					type="email"
					class="body-md"
					placeholder="you@example.com"
					bind:value={email}
					required
				/>
			</div>

			<div class="field">
				<label class="body-sm-bold" for="password">Password</label>
				<input
					id="password"
					type="password"
					class="body-md"
					placeholder="••••••••"
					bind:value={password}
					required
				/>
			</div>

			{#if !isLogin}
				<div class="field">
					<label class="body-sm-bold" for="confirm">Confirm Password</label>
					<input
						id="confirm"
						type="password"
						class="body-md"
						placeholder="••••••••"
						bind:value={confirmPassword}
						required
					/>
				</div>
			{/if}

			<button type="submit" class="submit-btn body-md-bold">
				{isLogin ? 'Log In' : 'Create Account'}
			</button>
		</form>

		<button class="guest-btn body-md" onclick={continueAsGuest}>
			Continue as Guest
		</button>

		<p class="toggle-text body-sm">
			{isLogin ? "Don't have an account?" : 'Already have an account?'}
			<button class="toggle-link body-sm-bold" onclick={toggleMode}>
				{isLogin ? 'Sign Up' : 'Log In'}
			</button>
		</p>
	</div>
</div>

<style>
	.login-screen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem 1.5rem;
		gap: 2rem;
		background-color: var(--bg-default);
		opacity: 0;
		transform: translateY(12px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.login-screen.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.top-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.logo {
		width: 200px;
		height: auto;
	}

	.card {
		width: 100%;
		max-width: 360px;
		background-color: var(--bg-surface, #fff);
		border-radius: 1.25rem;
		padding: 1.75rem 1.5rem;
		box-shadow: 0px 4px 24px rgba(12, 12, 13, 0.08);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.tab-row {
		display: flex;
		border-radius: 0.75rem;
		background-color: var(--bg-muted, #f3f3f3);
		padding: 4px;
		gap: 4px;
	}

	.tab {
		flex: 1;
		padding: 0.5rem;
		border: none;
		background: transparent;
		border-radius: 0.625rem;
		cursor: pointer;
		color: var(--text-subtle, #888);
		transition: background 0.2s ease, color 0.2s ease;
	}

	.tab.active {
		background-color: var(--bg-default, #fff);
		color: var(--text-default);
		box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.1);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.field label {
		color: var(--text-default);
	}

	.field input {
		padding: 0.75rem 1rem;
		border: 1.5px solid var(--border-default, #e0e0e0);
		border-radius: 0.75rem;
		background-color: var(--bg-default);
		color: var(--text-default);
		outline: none;
		transition: border-color 0.2s ease;
		font-family: Nunito;
	}

	.field input:focus {
		border-color: #0FA376;
	}

	.field input::placeholder {
		color: var(--text-subtle, #aaa);
	}

	.submit-btn {
		width: 100%;
		padding: 0.875rem;
		background-color: #0FA376;
		color: #fff;
		border: none;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: opacity 0.2s ease, transform 0.1s ease;
		margin-top: 0.25rem;
	}

	.submit-btn:active {
		transform: scale(0.98);
	}

	.guest-btn {
		width: 100%;
		padding: 0.875rem;
		background-color: transparent;
		color: #0FA376;
		border: 1.5px solid #0FA376;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: background-color 0.2s ease, transform 0.1s ease;
		font-family: Nunito;
	}

	.toggle-text {
		text-align: center;
		color: var(--text-subtle, #888);
		margin: 0;
	}

	.toggle-link {
		background: none;
		border: none;
		cursor: pointer;
		color: #0FA376;
		padding: 0;
		font-family: Nunito;
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 16px;
	}
</style>