<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="d-flex flex-column min-vh-100">
	<!-- Site Header -->
	<header class="border-bottom py-3 bg-light">
		<div class="container">
			<div class="d-flex align-items-center justify-content-between">
				<a href="/" class="text-decoration-none">
					<h1 class="h4 m-0 fw-bold">Base voardora no Deserto - blog</h1>
				</a>
				<nav class="d-flex gap-3">
					<a href="/" class="text-muted text-decoration-none">Início</a>
					<a href="/blog/devops" class="text-muted text-decoration-none">DevOps</a>
					<a href="/blog/bitcoin" class="text-muted text-decoration-none">Bitcoin</a>

				</nav>
			</div>
		</div>
	</header>

	<!-- Main content centered between header and footer -->
	<main class="flex-grow-1 d-flex align-items-start">
		<div class="container py-4">
			{@render children()}
		</div>
	</main>

	<!-- Site Footer -->
	<footer class="mt-auto border-top py-4 text-center text-muted bg-light">
		<div class="container">
			<p class="mb-1">Construído com SvelteKit, Bootstrap e mdsvex</p>
			<small>&copy; {new Date().getFullYear()} Nicholas Pucharelli</small>
		</div>
	</footer>
</div>
