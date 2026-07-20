<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>在线中英文标点转换工具</title>
	<meta
		name="description"
		content="英文标点转中文标点，中文标点转英文标点，免费，快速，灵活，准确，在线, "
	/>
</svelte:head>

{@render children()}
