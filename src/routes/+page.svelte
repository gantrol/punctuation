<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';

    let text = "";
    let result = "";

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
    };

    let checkboxes = Object.keys(punctuationPairs).reduce((acc, punctuation) => {
        acc[punctuation] = false;
        return acc;
    }, {});

    let copied = false;

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(result);
            copied = true;
            setTimeout(() => copied = false, 3000); // Display the notification for 3 seconds
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
    }

    function convertPunctuation() {
        result = text
        for (const key in checkboxes) {
            if (checkboxes[key]) {
                const regex = new RegExp('\\' + key, 'g');
                result = result.replace(regex, punctuationPairs[key]);
            }
        }

        if (checkboxes["\""]) {
            let isDoubleQuoteStart = true;
            result = result.replace(/"/g, () => {
                if (isDoubleQuoteStart) {
                    isDoubleQuoteStart = false;
                    return '“';
                } else {
                    isDoubleQuoteStart = true;
                    return '”';
                }
            });
        }
        if (checkboxes["\'"]) {
            let isSingleQuoteStart = true;
            result = result.replace(/'/g, () => {
                if (isSingleQuoteStart) {
                    isSingleQuoteStart = false;
                    return '‘';
                } else {
                    isSingleQuoteStart = true;
                    return '’';
                }
            });
        }
    }

    function selectAll() {
        for (const key in checkboxes) {
            checkboxes[key] = true;
        }
    }

    function selectCommon() {
        for (const key of Object.keys(punctuationCommonPairs)) {
            checkboxes[key] = true;
        }
    }

    function selectClaude2() {
        for (const key of Object.keys(punctuationClaude2Pairs)) {
            checkboxes[key] = true;
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
                <h3 class="text-sm font-semibold text-gray-700">成功复制到剪贴板！</h3>
                <div class="mt-2 text-sm text-gray-500">您现在可以粘贴文本了。</div>
            </div>
        </div>
    </div>
{/if}

<div class="app-container flex flex-col p-5 font-sans">
    <div class="checkboxes-container flex space-x-4 mb-4">
        <button class="px-4 py-2 text-sm text-white bg-blue-500 rounded" on:click={selectAll}>全选</button>
        <button class="px-4 py-2 text-sm text-black bg-blue-300 rounded" on:click={deselectAll}>清空</button>
        <button class="px-4 py-2 text-sm text-white bg-blue-500 rounded" on:click={selectCommon}>常见</button>
        <button class="px-4 py-2 text-sm text-white bg-blue-500 rounded" on:click={selectClaude2}>Claude2</button>
    </div>
    <div class="flex space-x-4">
        {#each Object.keys(checkboxes) as punctuation}
            <div class="checkbox-container flex items-center space-x-2">
                <input type="checkbox" bind:checked={checkboxes[punctuation]} id={punctuation} class="rounded"/>
                <label for={punctuation} class="text-sm">{punctuation}</label>
            </div>
        {/each}
    </div>
    <textarea bind:value={text} class="w-full h-64 mb-4 p-2 rounded border-2 border-gray-300"></textarea>
    <div>
        <button class="px-4 py-2 text-sm text-white bg-green-500 rounded mb-4" on:click={convertPunctuation}>转换标点
        </button>
        <button class="px-4 py-2 text-sm text-white bg-blue-500 rounded" on:click={copyToClipboard}>复制结果</button>

    </div>
    <textarea bind:this={outputArea} class="w-full h-64 mb-4 p-2 rounded border-2 border-gray-300"
              readonly>{result}</textarea>
</div>

