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

<section class="bg-dark text-white py-5">
	<div class="container text-center">
		<h1 class="display-3 fw-bold mb-3">ByteCraft</h1>
		<p class="lead text-muted fs-5">
			Compartilhando conhecimentos sobre tecnologia, desenvolvimento e cybersegurança.
		</p>
	</div>
</section>

<section class="bg-dark py-5">
	<div class="container">
		<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
			{#each posts as post}
				<div class="col">
					<Card
						title={post.title}
						description={post.description}
						date={formatDate(post.date)}
						url={post.url}
						isNew={post.isNew}
						image={post.image}
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
@media (min-width: 992px) {
	.row-cols-lg-3 > * {
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
	}
}
</style>

