<script>
    import GithubIcon from "./icons/GithubIcon.svelte";
    import GantrolIcon from "./icons/GantrolIcon.svelte";
</script>

<footer class="fixed bottom-0 left-0 w-full h-16 flex justify-center items-center space-x-4 bg-gray-900 text-white">
    <a href="https://github.com/gantrol/punctuation" target="_blank" class="flex transition-colors duration-300 bg-black items-center justify-center border-neutral-100 border hover:text-gray-500 hover:border-gray-500 hover:bg-white">
        <GithubIcon />
    </a>
    <a href="https://www.gantrol.com/" target="_blank" class="transition-colors bg-white duration-300 hover:bg-black flex items-center justify-center">
        <GantrolIcon />
    </a>
</footer>

<style>
    /* Add custom CSS styling here */
    a {
        padding: 3px; /* add some padding around the links */
        border-radius: 100px; /* round the corners of the link boxes */
    }

</style>
