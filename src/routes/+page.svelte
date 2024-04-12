<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { punctuationToChinese, punctuationToEnglish } from "$lib";
    import CopyIcon from "$lib/CopyIcon.svelte";

    let text = "";
    let result = "";

    const CH2EN = "，。→ ,.";
    const EN2CH = ",.→ ，。";
    let inputLanguage = EN2CH;

    const punctuationPairs = {
        "...": "……",
        ".": "。",
        ",": "，",
        "?": "？",
        "!": "！",
        ":": "：",
        ";": "；",
        "\"": "“",
        "\'": "‘",
        "[": "【",
        "]": "】",
        "(": "（",
        ")": "）",
    };

    const punctuationCommonPairs = {
        "...": "……",
        ".": "。",
        ",": "，",
        "?": "？",
        "!": "！",
        ":": "：",
        ";": "；",
        "\"": "“",
        "\'": "‘",
    };

    const punctuationClaude2Pairs = {
        ",": "，",
        "?": "？",
        "!": "！",
        ":": "：",
        ";": "；",
        "\"": "“",
        "\'": "‘",
        "(": "（",
        ")": "）",
    };

    $: checkboxes = (
        inputLanguage === EN2CH
            ? Object.keys(punctuationPairs)
            : Object.values(punctuationPairs)
    )
        .reduce((acc, punctuation) => {
        acc[punctuation] = false;
        return acc;
    }, {});

    $: {
        result = inputLanguage === CH2EN ? punctuationToEnglish(text, checkboxes) : punctuationToChinese(text, checkboxes);
    }

    let copied = false;

    async function copyToClipboard(copy_content) {
        try {
            await navigator.clipboard.writeText(copy_content);
            copied = true;
            setTimeout(() => copied = false, 3000);
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
    }

    const keyOrValue = (inputLanguage, dict) => {
        return inputLanguage === EN2CH
            ? Object.keys(dict)
            : Object.values(dict) ;
    }

    function swapLanguage() {
        // TODO: keep select?
        inputLanguage = inputLanguage === CH2EN ? EN2CH : CH2EN;
    }

    function selectAll() {
        for (const key in checkboxes) {
            checkboxes[key] = true;
        }
    }

    function selectCommon() {
        const selected_list = keyOrValue(inputLanguage, punctuationCommonPairs);
        for (const key in checkboxes) {
            checkboxes[key] = selected_list.includes(key);
        }
    }

    function selectClaude2() {
        const selected_list = keyOrValue(inputLanguage, punctuationClaude2Pairs);
        for (const key in checkboxes) {
            checkboxes[key] = selected_list.includes(key);
        }
    }

    function deselectAll() {
        for (const key in checkboxes) {
            checkboxes[key] = false;
        }
    }

    let outputArea;

    onMount(() => {
        outputArea.value = result;
    })
</script>

<section class="rounded-inherit mb-0" aria-labelledby="text-translator-section-heading">
    <h1 class="sr-only" id="text-translator-section-heading">中英文标点互换</h1>
    <h1 class="sr-only" id="text-translator-tag-heading">{inputLanguage === EN2CH ? "英文标点转中文": "中文标点转英文"}</h1>
    <div class="rounded-inherit">
        <div class="relative z-[2] min-[768px]:col-span-3">
            <div class="flex min-h-[56px] w-full flex-row flex-wrap px-3 py-2">
                <div class="flex flex-1 items-center space-x-1.5">
                    <div class="flex">
                        <div class="mx-1 flex items-center">
                            <button class="flex items-center py-2 px-3 space-x-1 text-base rounded transition-colors cursor-pointer enabled:hover:bg-gray-200 disabled:cursor-default disabled:text-gray-500 text-blue-600" on:click={swapLanguage}>
                                <span>
                                    <strong class="font-semibold">{inputLanguage}</strong>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between">
                    </div>
                </div>

                <div class="flex justify-between mr-3">
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700" on:click={selectAll}>全选</button>
                        <button class="px-4 py-2 text-sm text-black bg-gray-200 rounded hover:bg-gray-300" on:click={deselectAll}>清空</button>
<!--                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700" on:click={selectCommon}>常见</button>-->
                        <button class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700" on:click={selectClaude2}>Claude2</button>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    {#each Object.keys(checkboxes) as punctuation}
                        <div class="flex items-center space-x-2 mb-2 mr-4">
                            <input type="checkbox" bind:checked={checkboxes[punctuation]} id={punctuation} class="rounded text-blue-600 focus:ring-blue-500"/>
                            <label for={punctuation} class="text-sm">{punctuation}</label>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div id="textareasContainer" class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div class="relative min-h-[240px] min-w-0 md:min-h-[50vh]">
                <section aria-labelledby="source-heading" class="h-full rounded border-transparent focus-within:border-blue-600 transition-colors">
                    <div class="flex h-full flex-col">
                        <h2 id="source-heading" class="sr-only">源文本</h2>
                        <div class="relative flex-1 rounded">
                            <textarea bind:value={text} placeholder="在此输入文本..." class="w-full h-full p-2 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-600"></textarea>
                            <button class="absolute top-2 right-2 px-2 py-1 text-sm text-white bg-sky-200 rounded hover:bg-blue-500" on:click={() => copyToClipboard(text)}>
                                <CopyIcon />
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <div class="relative min-h-[240px] min-w-0 md:min-h-[50vh]">
                <section aria-labelledby="target-heading" class="h-full flex flex-col rounded border-transparent">
                    <h2 id="target-heading" class="sr-only">转换结果</h2>
                    <div class="relative flex-1 flex flex-col rounded">
                        <textarea bind:this={outputArea} readonly placeholder="转换结果" class="w-full h-full p-2 rounded border-2 border-gray-300 focus:outline-none">{result}</textarea>
                        <button class="absolute top-2 right-2 px-2 py-1 text-sm text-white bg-sky-200 rounded hover:bg-blue-500" on:click={() => copyToClipboard(result)}>
                            <CopyIcon />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</section>

{#if copied}
    <div transition:fly="{{ y: 30, duration: 200 }}"
         class="fixed bottom-0 right-0 p-6 bg-white shadow-lg rounded-md max-w-sm m-4 border-l-4 border-green-400">
        <div class="flex items-start">
            <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                 aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div class="ml-3">
                <h2 class="text-sm font-semibold text-gray-700">成功复制到剪贴板！</h2>
                <div class="mt-2 text-sm text-gray-500">您现在可以粘贴文本了。</div>
            </div>
        </div>
    </div>
{/if}
