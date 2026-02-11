<script>
	import { page } from '$app/stores';
	
	// Metadados do post vindos do frontmatter
	const { title, date, author, description } = $page.data;
</script>

<svelte:head>
	<title>{title} - Nicholas Blog</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="container py-5">
	<div class="row">
		<div class="col-lg-8 mx-auto">
			<!-- Voltar -->
			<div class="mb-4">
				<a href="/" class="text-decoration-none">
					← Voltar para o blog
				</a>
			</div>

			<!-- Header do Post -->
			<article>
				<header class="mb-5">
					<h1 class="display-4 fw-bold mb-3">{title}</h1>
					<div class="text-muted mb-3">
						{#if author}
							<span class="me-3">Por {author}</span>
						{/if}
						{#if date}
							<span>{new Date(date).toLocaleDateString('pt-BR', { 
								year: 'numeric', 
								month: 'long', 
								day: 'numeric' 
							})}</span>
						{/if}
					</div>
					{#if description}
						<p class="lead text-muted">{description}</p>
					{/if}
				</header>

				<!-- Conteúdo do Post -->
				<div class="post-content">
					<slot />
				</div>
			</article>

			<!-- Footer -->
			<footer class="mt-5 pt-4 border-top">
				<div class="text-center">
					<a href="/" class="btn btn-outline-primary">
						Ver todos os posts
					</a>
				</div>
			</footer>
		</div>
	</div>
</div>

<style>
	/* Estilos para o conteúdo Markdown */
	:global(.post-content h1) {
		font-size: 2rem;
		font-weight: bold;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.post-content h2) {
		font-size: 1.75rem;
		font-weight: bold;
		margin-top: 1.75rem;
		margin-bottom: 0.875rem;
	}

	:global(.post-content h3) {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.post-content p) {
		margin-bottom: 1rem;
		line-height: 1.7;
	}

	:global(.post-content ul, .post-content ol) {
		margin-bottom: 1rem;
		padding-left: 2rem;
	}

	:global(.post-content li) {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	:global(.post-content pre) {
		background-color: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 0.375rem;
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	:global(.post-content code) {
		background-color: #f8f9fa;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	:global(.post-content pre code) {
		background-color: transparent;
		padding: 0;
	}

	:global(.post-content blockquote) {
		border-left: 4px solid #0d6efd;
		padding-left: 1rem;
		margin-left: 0;
		margin-bottom: 1rem;
		font-style: italic;
		color: #6c757d;
	}

	:global(.post-content a) {
		color: #0d6efd;
		text-decoration: none;
	}

	:global(.post-content a:hover) {
		text-decoration: underline;
	}

	:global(.post-content img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.375rem;
		margin-bottom: 1rem;
	}
</style>
