/**
 * Replaces punctuation marks in a text with English equivalents.
 *
 * @param {string} text - The text containing punctuation marks to be replaced.
 * @return {string} - The updated text with English punctuation marks.
 */
export function punctuationToEnglish(text) {
    return text.replace(/，/g, ",")
        .replace(/。/g, ".")
        .replace(/'/g, "'")
        .replace(/'/g, "'")
        .replace(/"/g, '"')
        .replace(/"/g, '"')
        .replace(/；/g, ";")
        .replace(/：/g, ":")
        .replace(/？/g, "?")
        .replace(/！/g, "!");
}

/**
 * A regular expression pattern for matching Chinese characters.
 *
 * @type {RegExp}
 * @see {@link https://unicode.org/reports/tr18/#Script_Extensions}
 * @since 2021-10-01
 */
export const chineseRegex = /\p{Script=Han}/u;

/**
 * Determines whether the punctuation at the specified position in the given text should be replaced.
 *
 * @param {number} position - The position of the punctuation in the text.
 * @param {string} text - The text containing the punctuation.
 * @returns {boolean} - True if the punctuation should be replaced, false otherwise.
 */
function shouldReplacePunctuation(position, text) {
    if (position < text.length){
        if (position === 0)　{
            if (text.length > 1) {
                return chineseRegex.test(text[position + 1]);
            } else {
                return true;
            }
        } else {
            return chineseRegex.test(text[position - 1]);
        }
    } else {
        return false;
    }
}

/**
 * Convert punctuation marks in the given text to corresponding Chinese punctuation marks.
 *
 * @param {string} text - The input text.
 * @param checkItems
 * @return {string} - The text with punctuation marks converted to Chinese punctuation marks.
 */
export function punctuationToChinese(text, checkItems) {
    let singleQuoteFlag = false;
    let doubleQuoteFlag = false;
    // TODO: replace ... to …… if has it...
    if (checkItems['...']) {
        text = text.replace(/\.\.\./g, "……");
    }
    let result = text.split("");

    for (let i = 0; i < result.length; i++) {
        const cur = result[i]
        if (checkItems[cur]) {
            switch (cur) {
                // 看上下文型
                case ",":
                    if (shouldReplacePunctuation(i, text)) {
                        result[i] = "，";
                    }
                    break;
                case ".":
                    if (shouldReplacePunctuation(i, text)) {
                        result[i] = "。";
                    }
                    break;
                //     TODO: test - ： ——
                case "-":
                    if (shouldReplacePunctuation(i, text)) {
                        result[i] = "——";
                    }
                    break;
                // 直换型
                case ";":
                    result[i] = "；";
                    break;
                case ":":
                    result[i] = "：";
                    break;
                case "?":
                    result[i] = "？";
                    break;
                case "!":
                    result[i] = "！";
                    break;
                case "(":
                    result[i] = "（";
                    break;
                case ")":
                    result[i] = "）";
                    break;
                case "[":
                    result[i] = "【";
                    break;
                case "]":
                    result[i] = "】";
                    break;
                // 成对型
                case "'":
                    result[i] = singleQuoteFlag ? "’" : "‘";
                    singleQuoteFlag = !singleQuoteFlag;
                    break;
                case '"':
                    result[i] = doubleQuoteFlag ? '”' : '“';
                    doubleQuoteFlag = !doubleQuoteFlag;
                    break;

            }
        }
    }
    return result.join("");
}
