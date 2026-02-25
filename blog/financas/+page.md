<script>
	import { page } from '$app/stores';
	let currentPath = $derived($page.url.pathname);
</script>

# Está é a seção dedicada a finança do Blog

<a href="{currentPath}contabilidade" class="text-muted text-decoration-none">Contabilidade</a>
