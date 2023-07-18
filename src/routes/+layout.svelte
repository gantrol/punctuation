<script>
    import "../app.css";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
    <title>英文标点转中文</title>
</svelte:head>

<slot />
