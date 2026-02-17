<script>
	let { children } = $props();

	const postWidth = 12;

</script>

<div class="container">
	<div class="row">
		<div class={`col-lg-${postWidth} mx-auto`}>
			<article class="blog-post">
				<a href="/" class="btn btn-outline-primary mb-4">Voltar</a>
				
				<div class="post-content">
					{@render children()}
				</div>
			</article>
		</div>
	</div>
</div>

<style>
	.post-content :global(h1) {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
		color: #212529;
	}
	
	.post-content :global(h2) {
		font-size: 2rem;
		font-weight: bold;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: #495057;
	}
	
	.post-content :global(h3) {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}
	
	.post-content :global(p) {
		font-size: 1.1rem;
		line-height: 1.8;
		margin-bottom: 1.5rem;
		color: #495057;
	}
	
	.post-content :global(code) {
		background-color: #f8f9fa;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9em;
		color: #e83e8c;
	}
	
	.post-content :global(pre) {
		background-color: #f8f9fa;
		padding: 1rem;
		border-radius: 5px;
		overflow-x: auto;
		margin-bottom: 1.5rem;
	}
	
	.post-content :global(pre code) {
		background-color: transparent;
		padding: 0;
		color: inherit;
	}
	
	.post-content :global(blockquote) {
		border-left: 4px solid #0d6efd;
		padding-left: 1rem;
		margin: 1.5rem 0;
		color: #6c757d;
		font-style: italic;
	}
	
	.post-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		margin: 1.5rem 0;
	}
	
	
	.post-content :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}
	
	.post-content :global(a) {
		color: #0d6efd;
		text-decoration: none;
	}
	
	.post-content :global(a:hover) {
		text-decoration: underline;
	}
</style>
