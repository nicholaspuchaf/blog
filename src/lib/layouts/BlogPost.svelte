<script>
	let { children } = $props();
</script>

<div class="blog-post-wrapper">
	<div class="blog-post-container">
		<article class="blog-post">
			<a href="/" class="back-link">← Voltar ao blog</a>
			<div class="post-content">
				{@render children()}
			</div>
		</article>
	</div>
</div>

<style>
.blog-post-wrapper {
	background: #1a1d23;
	padding: 2rem 1rem;
	min-height: 100vh;
}

.blog-post-container {
	max-width: 820px;
	margin: 0 auto;
}

.blog-post {
	background: #f9fafb;
	border-radius: 1rem;
	padding: 3rem;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.back-link {
	display: inline-block;
	color: #3b82f6;
	text-decoration: none;
	font-weight: 600;
	margin-bottom: 2rem;
	transition: color 0.2s;
}

.back-link:hover {
	color: #2563eb;
}

.post-content :global(h1) {
	font-size: 2.5rem;
	font-weight: 800;
	color: #111827;
	margin: 0 0 1.5rem 0;
	line-height: 1.2;
	letter-spacing: -0.02em;
}

.post-content :global(h2) {
	font-size: 2rem;
	font-weight: 700;
	color: #1f2937;
	margin: 2.5rem 0 1rem 0;
	line-height: 1.3;
}

.post-content :global(h3) {
	font-size: 1.5rem;
	font-weight: 600;
	color: #374151;
	margin: 2rem 0 0.75rem 0;
}

.post-content :global(p) {
	font-size: 1.125rem;
	color: #374151;
	line-height: 1.8;
	margin: 0 0 1.5rem 0;
}

.post-content :global(a) {
	color: #3b82f6;
	text-decoration: none;
	font-weight: 500;
}

.post-content :global(a:hover) {
	text-decoration: underline;
}

.post-content :global(code) {
	background: #e5e7eb;
	color: #dc2626;
	padding: 0.2rem 0.5rem;
	border-radius: 0.375rem;
	font-size: 0.9em;
	font-family: 'Monaco', 'Courier New', monospace;
}

.post-content :global(pre) {
	background: #1f2937;
	color: #e5e7eb;
	padding: 1.5rem;
	border-radius: 0.75rem;
	overflow-x: auto;
	margin: 1.5rem 0;
	line-height: 1.6;
}

.post-content :global(pre code) {
	background: transparent;
	color: inherit;
	padding: 0;
	border-radius: 0;
}

.post-content :global(blockquote) {
	border-left: 4px solid #3b82f6;
	padding-left: 1.5rem;
	margin: 2rem 0;
	color: #6b7280;
	font-style: italic;
}

.post-content :global(ul),
.post-content :global(ol) {
	margin: 1.5rem 0;
	padding-left: 2rem;
	color: #374151;
}

.post-content :global(li) {
	margin-bottom: 0.75rem;
	line-height: 1.7;
}

.post-content :global(img) {
	max-width: 100%;
	height: auto;
	border-radius: 0.75rem;
	margin: 2rem 0;
}

@media (max-width: 768px) {
	.blog-post {
		padding: 2rem 1.5rem;
	}
	.post-content :global(h1) {
		font-size: 2rem;
	}
	.post-content :global(h2) {
		font-size: 1.5rem;
	}
	.post-content :global(h3) {
		font-size: 1.25rem;
	}
	.post-content :global(p) {
		font-size: 1rem;
	}
}
</style>
