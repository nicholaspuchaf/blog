<script>
	import Card from '$lib/layouts/Card.svelte';

	let { data } = $props();
	const posts = data.posts;
	
	// Função para formatar a data
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-BR', { 
			day: 'numeric', 
			month: 'long', 
			year: 'numeric' 
		});
	}
</script>

<div class="container py-5">
	<div class="row">
		<div class="col-lg-8 mx-auto">
			<!-- Header -->
			<header class="mb-5 text-center">
				<h1 class="display-4 fw-bold mb-3">Nicholas Blog</h1>
				<p class="lead text-muted">
					Compartilhando conhecimentos sobre tecnologia, programação e desenvolvimento web
				</p>
			</header>

			<!-- Posts List -->
			<div class="row g-4">
				{#each posts as post}
					<Card 
						title={post.title}
						description={post.description}
						date={formatDate(post.date)}
						url={post.url}
						isNew={post.isNew}
					/>
				{/each}
			</div>

			<!-- Footer -->
			<footer class="mt-5 pt-4 border-top text-center text-muted">
				<p>
					Construído com ❤️ usando 
					<a href="https://kit.svelte.dev" target="_blank" class="text-decoration-none">SvelteKit</a>, 
					<a href="https://getbootstrap.com" target="_blank" class="text-decoration-none">Bootstrap</a> e 
					<a href="https://mdsvex.pngwn.io" target="_blank" class="text-decoration-none">mdsvex</a>
				</p>
			</footer>
		</div>
	</div>
</div>

