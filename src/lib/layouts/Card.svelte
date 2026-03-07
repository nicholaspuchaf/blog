<script>
	let { title, description, date, url, isNew = false, image = null } = $props();
	import { resolve } from "$app/paths";
</script>

<article class="card h-100 bg-light shadow-sm border-0 rounded-3 card-hover">
	<a href={resolve(url)} class="text-decoration-none text-dark d-flex flex-column h-100">
		{#if image}
			<img src={image} alt={title} class="card-img-top rounded-top-3" style="height: 200px; object-fit: cover; background: #dee2e6;" />
		{/if}
		<div class="card-body d-flex flex-column p-4">
			<div class="d-flex justify-content-between align-items-center mb-3">
				<small class="text-muted">{date}</small>
				{#if isNew}
					<span class="badge bg-primary rounded-pill">Novo</span>
				{/if}
			</div>
			<h2 class="card-title h5 fw-bold mb-2">{title}</h2>
			<p class="card-text text-secondary mb-3 flex-grow-1">{description}</p>
			<span class="text-primary fw-semibold read-more">Ler mais →</span>
		</div>
	</a>
</article>

<style>
.card-hover {
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hover:hover {
	transform: translateY(-4px);
	box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15) !important;
}
.read-more {
	transition: color 0.2s;
}
.card-hover:hover .read-more {
	color: #0056b3 !important;
}
</style>