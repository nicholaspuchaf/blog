<script>
	let { title, description, date, url, isNew = false } = $props();
</script>

<div class="col-12">
	<div class="card h-100 shadow-sm hover-card">
		<div class="card-body">
			<div class="d-flex justify-content-between align-items-center mb-2">
				<small class="text-muted">{date}</small>
				{#if isNew}
					<span class="badge bg-primary">Novo</span>
				{/if}
			</div>
			<h2 class="card-title h4 mb-3">
				<a href={url} class="text-decoration-none text-dark">
					{title}
				</a>
			</h2>
			<p class="card-text text-muted">
				{description}
			</p>
			<a href={url} class="btn btn-outline-primary">
				Ler mais →
			</a>
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