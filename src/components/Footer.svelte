<script>
    import GithubIcon from "./icons/GithubIcon.svelte";
    import GantrolIcon from "./icons/GantrolIcon.svelte";
    import CurIcon from "./icons/CurIcon.svelte";

    /**
     * Rotate method applies rotation animations to a given DOM node.
     * It sets event handlers for mouseover, mouseleave, and click events.
     *
     * @param {HTMLElement} node - The DOM element to apply the rotation animations to.
     * @return {void}
     */
    function rotate(node) {
        node.onmouseover = () => {
            node.style.transition = "all 0.5s ease-in-out";
            node.style.transform = "rotate(90deg)";
        };

        node.onmouseleave = () => {
            node.style.transform = "";
        };

        node.onclick = (e) => {
            e.preventDefault();
            node.style.transition = "all 0.5s ease-in-out";
            node.style.transform = "rotate(360deg)";
            setTimeout(() => {
                node.style.transform = "";
            }, 2000);
        };
    }
</script>

<footer class="fixed bottom-0 left-0 w-full h-16 flex justify-center items-center space-x-4 bg-gray-900 text-white">
    <a
            class="flex transition-colors duration-300 bg-black items-center justify-center border-neutral-100 border
                hover:text-gray-500 hover:border-gray-500 hover:bg-white"
            href="https://github.com/gantrol/punctuation"
            target="_blank">
        <GithubIcon/>
    </a>
    <a
            class="transition-colors bg-black duration-300 hover:bg-white flex items-center justify-center"
            href="/"
            use:rotate
    >
        <CurIcon/>
    </a>
    <a class="transition-colors bg-white duration-300 hover:bg-black flex items-center justify-center"
       href="https://www.gantrol.com/"
       target="_blank">
        <GantrolIcon/>
    </a>
</footer>

<style>
    /* Add custom CSS styling here */
    a {
        padding: 3px; /* add some padding around the links */
        border-radius: 100px; /* round the corners of the link boxes */
    }

</style>
