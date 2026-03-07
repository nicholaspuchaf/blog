<script>
	let { children } = $props();
	import { resolve } from "$app/paths";
</script>

<div class="bg-dark py-4 py-md-5">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-12 col-lg-10 col-xl-12">
				<article class="bg-light rounded-3 shadow p-4 p-md-5">
					<a href={resolve("/")} class="btn btn-link text-primary text-decoration-none fw-semibold mb-4 p-0">
						← Voltar ao blog
					</a>
					<div class="post-content">
						{@render children()}
					</div>
				</article>
			</div>
		</div>
	</div>
</div>

<style>
/* Headings com Bootstrap utilities */
.post-content :global(h1) {
	font-size: clamp(2rem, 5vw, 2.5rem);
	font-weight: 800;
	line-height: 1.2;
	letter-spacing: -0.02em;
}

.post-content :global(h2) {
	font-size: clamp(1.5rem, 4vw, 2rem);
	font-weight: 700;
	line-height: 1.3;
}

.post-content :global(h3) {
	font-size: clamp(1.25rem, 3vw, 1.5rem);
	font-weight: 600;
}

.post-content :global(h1),
.post-content :global(h2),
.post-content :global(h3) {
	color: var(--bs-dark);
}

.post-content :global(h1) {
	margin-bottom: 1.5rem;
}

.post-content :global(h2) {
	margin-top: 2.5rem;
	margin-bottom: 1rem;
}

.post-content :global(h3) {
	margin-top: 2rem;
	margin-bottom: 0.75rem;
}

/* Paragraphs */
.post-content :global(p) {
	font-size: 1.125rem;
	color: var(--bs-gray-700);
	line-height: 1.8;
	margin-bottom: 1.5rem;
}

/* Links */
.post-content :global(a) {
	color: var(--bs-primary);
	text-decoration: none;
	font-weight: 500;
}

.post-content :global(a:hover) {
	text-decoration: underline;
	color: var(--bs-primary);
}

/* Inline code */
.post-content :global(code) {
	background: var(--bs-gray-200);
	color: var(--bs-danger);
	padding: 0.2rem 0.5rem;
	border-radius: var(--bs-border-radius);
	font-size: 0.9em;
	font-family: var(--bs-font-monospace);
}

/* Code blocks */
.post-content :global(pre) {
	background: var(--bs-dark);
	color: var(--bs-light);
	padding: 1.5rem;
	border-radius: var(--bs-border-radius-lg);
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

/* Blockquotes */
.post-content :global(blockquote) {
	border-left: 4px solid var(--bs-primary);
	padding-left: 1.5rem;
	margin: 2rem 0;
	color: var(--bs-gray-600);
	font-style: italic;
}

/* Lists */
.post-content :global(ul),
.post-content :global(ol) {
	margin: 1.5rem 0;
	padding-left: 2rem;
	color: var(--bs-gray-700);
}

.post-content :global(li) {
	margin-bottom: 0.75rem;
	line-height: 1.7;
}

/* Images */
.post-content :global(img) {
	max-width: 100%;
	height: auto;
	border-radius: var(--bs-border-radius-lg);
	margin: 2rem 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.post-content :global(p) {
		font-size: 1rem;
	}
}
</style>
