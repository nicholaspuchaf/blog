<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>ByteCraft - blog</title>
</svelte:head>

<div class="site-wrapper">
	<header class="site-header">
		<div class="header-container">
			<a href="/" class="logo-link">
				<span class="logo-text">ByteCraft</span>
			</a>
			<nav class="nav-menu">
				<a href="/" class="nav-item">Início</a>
				<a href="/blog/devops" class="nav-item">DevOps</a>
				<a href="/blog/bitcoin" class="nav-item">Bitcoin</a>
			</nav>
		</div>
	</header>

	<main class="main-content">
		{@render children()}
	</main>

	<footer class="site-footer">
		<div class="footer-container">
			<p>Construído com SvelteKit, Bootstrap e mdsvex</p>
			<small>&copy; {new Date().getFullYear()} Nicholas Pucharelli</small>
		</div>
	</footer>
</div>

<style>
:global(body) {
	margin: 0;
	padding: 0;
	background: #1a1d23;
	color: #e4e6eb;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.site-wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: #1a1d23;
}

.site-header {
	background: #23272f;
	border-bottom: 1px solid #2d3139;
	padding: 1rem 0;
	position: sticky;
	top: 0;
	z-index: 100;
}

.header-container {
	max-width: 1280px;
	margin: 0 auto;
	padding: 0 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.logo-link {
	text-decoration: none;
}

.logo-text {
	font-size: 1.5rem;
	font-weight: 700;
	color: #ffffff;
	letter-spacing: -0.02em;
}

.nav-menu {
	display: flex;
	gap: 2rem;
}

.nav-item {
	color: #b8bdc7;
	text-decoration: none;
	font-weight: 500;
	transition: color 0.2s;
}

.nav-item:hover {
	color: #5a9eff;
}

.main-content {
	flex: 1;
	background: #1a1d23;
}

.site-footer {
	background: #23272f;
	border-top: 1px solid #2d3139;
	padding: 2rem 0;
	text-align: center;
	color: #8a8f98;
}

.footer-container {
	max-width: 1280px;
	margin: 0 auto;
	padding: 0 2rem;
}

.footer-container p {
	margin: 0 0 0.5rem 0;
}

@media (max-width: 768px) {
	.header-container {
		padding: 0 1rem;
	}
	.nav-menu {
		gap: 1rem;
	}
	.nav-item {
		font-size: 0.9rem;
	}
}
</style>
