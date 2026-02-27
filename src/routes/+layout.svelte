<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>ByteCraft - blog</title>
</svelte:head>

<div class="d-flex flex-column min-vh-100 bg-dark">
	<header class="bg-dark border-bottom border-secondary sticky-top">
		<div class="container-fluid px-3 px-lg-4">
			<div class="d-flex justify-content-between align-items-center py-3">
				<a href="/" class="text-decoration-none">
					<span class="fs-4 fw-bold text-white">ByteCraft</span>
				</a>
				<nav class="d-flex gap-3 gap-lg-4">
					<a href="/" class="text-light text-decoration-none fw-medium hover-link">Início</a>
					<a href="/blog/devops" class="text-light text-decoration-none fw-medium hover-link">DevOps</a>
					<a href="/blog/bitcoin" class="text-light text-decoration-none fw-medium hover-link">Bitcoin</a>
					<a href="/blog/financas" class="text-light text-decoration-none fw-medium hover-link">Finanças</a>
					<a href="/blog/seguranca" class="text-light text-decoration-none fw-medium hover-link">Segurança</a>
					<a href="/machineLearning" class="text-light text-decoration-none fw-medium hover-link">Machine Learning</a>
				</nav>
			</div>
		</div>
	</header>

	<main class="flex-grow-1 bg-dark">
		{@render children()}
	</main>

	<footer class="bg-dark border-top border-secondary py-4 text-center text-white-50 mt-auto">
		<div class="container">
			<p class="mb-1">Construído com SvelteKit, Bootstrap e mdsvex</p>
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

</style>
