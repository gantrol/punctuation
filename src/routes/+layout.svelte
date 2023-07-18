<script>
    import "../app.css";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
    <title>在线英文标点转中文标点工具</title>
    <meta name="description"
          content="英文标点转中文标点, 免费, 快速, 准确, 在线, 英文标点转中文"
    >
</svelte:head>

<slot />
