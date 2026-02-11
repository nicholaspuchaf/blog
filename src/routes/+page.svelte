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
				<!-- Post Card 1 -->
				<div class="col-12">
					<div class="card h-100 shadow-sm hover-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-2">
								<small class="text-muted">10 de fevereiro de 2026</small>
								<span class="badge bg-primary">Novo</span>
							</div>
							<h2 class="card-title h4 mb-3">
								<a href="/blog/primeiro-post" class="text-decoration-none text-dark">
									Meu Primeiro Post
								</a>
							</h2>
							<p class="card-text text-muted">
								Este é o meu primeiro post no blog usando SvelteKit e Markdown. 
								Descubra como é fácil escrever conteúdo em Markdown!
							</p>
							<a href="/blog/primeiro-post" class="btn btn-outline-primary">
								Ler mais →
							</a>
						</div>
					</div>
				</div>

				<!-- Post Card 2 -->
				<div class="col-12">
					<div class="card h-100 shadow-sm hover-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-2">
								<small class="text-muted">10 de fevereiro de 2026</small>
								<span class="badge bg-primary">Novo</span>
							</div>
							<h2 class="card-title h4 mb-3">
								<a href="/blog/segundo-post" class="text-decoration-none text-dark">
									Configurando um Blog com SvelteKit
								</a>
							</h2>
							<p class="card-text text-muted">
								Aprenda como configurar um blog pessoal com SvelteKit, Bootstrap e Markdown.
								Conheça a stack tecnológica utilizada neste projeto.
							</p>
							<a href="/blog/segundo-post" class="btn btn-outline-primary">
								Ler mais →
							</a>
						</div>
					</div>
				</div>
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

<style>
	.hover-card {
		transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}
	
	.hover-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	}
</style>

