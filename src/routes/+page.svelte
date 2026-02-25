<script>
	import Card from '$lib/layouts/Card.svelte';

	let { data } = $props();
	const posts = data.posts;

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-BR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<section class="hero-section">
	<div class="hero-content">
		<h1 class="hero-title">ByteCraft</h1>
		<p class="hero-subtitle">
			Compartilhando conhecimentos sobre tecnologia, desenvolvimento e cybersegurança.
		</p>
	</div>
</section>

<section class="posts-section">
	<div class="posts-container">
		<div class="posts-grid">
			{#each posts as post}
				<Card
					title={post.title}
					description={post.description}
					date={formatDate(post.date)}
					url={post.url}
					isNew={post.isNew}
					image={post.image}
				/>
			{/each}
		</div>
	</div>
</section>

<style>
.hero-section {
	background: #1a1d23;
	padding: 4rem 2rem 3rem;
	text-align: center;
}

.hero-content {
	max-width: 800px;
	margin: 0 auto;
}

.hero-title {
	font-size: 3rem;
	font-weight: 800;
	color: #ffffff;
	margin: 0 0 1rem 0;
	letter-spacing: -0.03em;
}

.hero-subtitle {
	font-size: 1.25rem;
	color: #b8bdc7;
	margin: 0;
	line-height: 1.6;
}

.posts-section {
	background: #1a1d23;
	padding: 3rem 2rem 5rem;
}

.posts-container {
	max-width: 1280px;
	margin: 0 auto;
}

.posts-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	gap: 2rem;
}

@media (max-width: 768px) {
	.hero-title {
		font-size: 2rem;
	}
	.hero-subtitle {
		font-size: 1rem;
	}
	.posts-grid {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
	.hero-section {
		padding: 3rem 1rem 2rem;
	}
	.posts-section {
		padding: 2rem 1rem 3rem;
	}
}
</style>

