<script>
	let { title, description, date, url, isNew = false, image = null } = $props();
</script>

<article class="post-card">
	<a href={url} class="card-link">
		{#if image}
			<div class="card-image">
				<img src={image} alt={title} />
			</div>
		{/if}
		<div class="card-content">
			<div class="card-meta">
				<span class="card-date">{date}</span>
				{#if isNew}
					<span class="badge-new">Novo</span>
				{/if}
			</div>
			<h2 class="card-title">{title}</h2>
			<p class="card-description">{description}</p>
			<span class="card-cta">Ler mais →</span>
		</div>
	</a>
</article>

<style>
.post-card {
	background: #f9fafb;
	border-radius: 1rem;
	overflow: hidden;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	height: 100%;
	display: flex;
	flex-direction: column;
}

.post-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-link {
	text-decoration: none;
	color: inherit;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.card-image {
	width: 100%;
	height: 200px;
	overflow: hidden;
	background: #e5e7eb;
}

.card-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card-content {
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	flex: 1;
}

.card-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

.card-date {
	font-size: 0.875rem;
	color: #6b7280;
}

.badge-new {
	background: #3b82f6;
	color: #ffffff;
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 600;
}

.card-title {
	font-size: 1.5rem;
	font-weight: 700;
	color: #111827;
	margin: 0 0 0.75rem 0;
	line-height: 1.3;
}

.card-description {
	font-size: 1rem;
	color: #4b5563;
	line-height: 1.6;
	margin: 0 0 1.5rem 0;
	flex: 1;
}

.card-cta {
	color: #3b82f6;
	font-weight: 600;
	font-size: 1rem;
	transition: color 0.2s;
}

.post-card:hover .card-cta {
	color: #2563eb;
}

@media (max-width: 768px) {
	.card-content {
		padding: 1.25rem;
	}
	.card-title {
		font-size: 1.25rem;
	}
	.card-description {
		font-size: 0.95rem;
	}
}
</style>