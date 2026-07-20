/**
 * Replaces punctuation marks in a text with English equivalents.
 *
 * @param {string} text - The text containing punctuation marks to be replaced.
 * @param {Object.<string, boolean>} checkItems
 * @return {string} - The updated text with English punctuation marks.
 */

export function punctuationToEnglish(text, checkItems) {
	if (checkItems['……']) {
		text = text.replace(/……/g, '...');
	}

	let result = text.split('');

	for (let i = 0; i < result.length; i++) {
		const cur = result[i];
		if (checkItems[cur]) {
			switch (cur) {
				case '，':
					result[i] = ',';
					break;
				case '。':
					result[i] = '.';
					break;
				case '——':
					result[i] = '-';
					break;
				case '；':
					result[i] = ';';
					break;
				case '：':
					result[i] = ':';
					break;
				case '？':
					result[i] = '?';
					break;
				case '！':
					result[i] = '!';
					break;
				case '（':
					result[i] = '(';
					break;
				case '）':
					result[i] = ')';
					break;
				case '【':
					result[i] = '[';
					break;
				case '】':
					result[i] = ']';
					break;
				case '“':
				case '”':
					result[i] = '"';
					break;
				case '‘':
				case '’':
					result[i] = "'";
					break;
			}
		}
	}
	return result.join('');
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
 * Marks ranges whose punctuation is syntax rather than prose.
 *
 * @param {string} text
 * @param {boolean[]} mask
 * @param {RegExp} pattern
 * @param {boolean} [trimTrailingPunctuation]
 */
function markProtectedMatches(text, mask, pattern, trimTrailingPunctuation = false) {
	let match;
	while ((match = pattern.exec(text)) !== null) {
		let end = match.index + match[0].length;
		if (trimTrailingPunctuation && /[.,;:!?]/.test(text[end - 1] ?? '')) {
			end--;
		}
		for (let i = match.index; i < end; i++) {
			mask[i] = true;
		}

		// All current patterns consume at least one character. Keep this guard
		// so a future zero-width pattern cannot make the loop hang.
		if (match[0].length === 0) {
			pattern.lastIndex++;
		}
	}
}

/**
 * Builds a mask for Markdown/code fragments and common machine-readable tokens.
 *
 * @param {string} text
 * @returns {boolean[]}
 */
function buildProtectedMask(text) {
	/** @type {boolean[]} */
	const mask = new Array(text.length).fill(false);

	const patterns = [
		/```[\s\S]*?(?:```|$)/g,
		/~~~[\s\S]*?(?:~~~|$)/g,
		/`[^`\r\n]*`/g,
		/\$\$[\s\S]*?(?:\$\$|$)/g,
		/\$[^$\r\n]+\$/g,
		/!?\[[^\]\r\n]*\]\([^)\r\n]*\)/g,
		/<[^>\r\n]+>/g,
		/[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[A-Za-z]{2,}/gu,
		/\b[A-Za-z]:\\[A-Za-z0-9_.$~\\/-]+/g,
		/(?:^|[\t ])--?[A-Za-z][A-Za-z0-9-]*/gm,
		/\b[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)*\([^()\r\n\p{Script=Han}]*\)/gu,
		/^[\t ]*(?:\d+|[A-Za-z])[.)](?=[\t ])/gm
	];

	for (const pattern of patterns) {
		markProtectedMatches(text, mask, pattern);
	}
	markProtectedMatches(
		text,
		mask,
		/\b(?:https?:\/\/|ftp:\/\/|www\.)[A-Za-z0-9._~:/?#@!$&'*+;=%-]+/gi,
		true
	);

	return mask;
}

/**
 * Marks each line that contains Chinese prose outside protected fragments.
 *
 * @param {string} text
 * @param {boolean[]} protectedMask
 * @returns {boolean[]}
 */
function buildChineseContextMask(text, protectedMask) {
	/** @type {boolean[]} */
	const mask = new Array(text.length).fill(false);
	let lineStart = 0;

	while (lineStart < text.length) {
		const newline = text.indexOf('\n', lineStart);
		const lineEnd = newline === -1 ? text.length : newline;
		let visibleText = '';

		for (let i = lineStart; i < lineEnd; i++) {
			if (!protectedMask[i]) {
				visibleText += text[i];
			}
		}

		if (chineseRegex.test(visibleText)) {
			for (let i = lineStart; i < lineEnd; i++) {
				mask[i] = true;
			}
		}

		if (newline === -1) {
			break;
		}
		lineStart = newline + 1;
	}

	return mask;
}

/**
 * @param {boolean[]} mask
 * @param {number} start
 * @param {number} length
 * @returns {boolean}
 */
function rangeIsProtected(mask, start, length) {
	for (let i = start; i < start + length; i++) {
		if (mask[i]) {
			return true;
		}
	}
	return false;
}

/**
 * @param {string} text
 * @param {number} position
 * @param {string} punctuation
 * @returns {boolean}
 */
function isTechnicalPunctuation(text, position, punctuation) {
	const previous = text[position - 1] ?? '';
	const next = text[position + 1] ?? '';
	const previousIsDigit = /\d/.test(previous);
	const nextIsDigit = /\d/.test(next);

	if (
		(punctuation === '.' || punctuation === ',' || punctuation === ':') &&
		previousIsDigit &&
		nextIsDigit
	) {
		return true;
	}

	if (punctuation === '.' && /[A-Za-z0-9]/.test(previous) && /[A-Za-z0-9]/.test(next)) {
		return true;
	}

	if (punctuation === '-') {
		return (
			previousIsDigit || nextIsDigit || /[A-Za-z0-9]/.test(previous) || /[A-Za-z0-9]/.test(next)
		);
	}

	if (punctuation === "'") {
		return (/[A-Za-z0-9]/.test(previous) && /[A-Za-z0-9]/.test(next)) || previousIsDigit;
	}

	return false;
}

/**
 * Convert punctuation marks in the given text to corresponding Chinese punctuation marks.
 *
 * @param {string} text - The input text.
 * @param {Object.<string, boolean>} checkItems
 * @return {string} - The text with punctuation marks converted to Chinese punctuation marks.
 */
export function punctuationToChinese(text, checkItems) {
	if (!text || !chineseRegex.test(text)) {
		return text;
	}

	const selected = checkItems ?? {};
	const protectedMask = buildProtectedMask(text);
	const chineseContextMask = buildChineseContextMask(text, protectedMask);
	/** @type {Object.<string, string>} */
	const replacements = {
		',': '，',
		'.': '。',
		'-': '——',
		';': '；',
		':': '：',
		'?': '？',
		'!': '！',
		'(': '（',
		')': '）',
		'[': '【',
		']': '】'
	};
	let singleQuoteOpen = false;
	let doubleQuoteOpen = false;
	let result = '';

	for (let i = 0; i < text.length; i++) {
		const current = text[i];
		const inChineseContext = chineseContextMask[i];

		if (text.startsWith('...', i)) {
			let runEnd = i + 3;
			while (text[runEnd] === '.') {
				runEnd++;
			}
			const runLength = runEnd - i;

			if (selected['...'] && inChineseContext && !rangeIsProtected(protectedMask, i, runLength)) {
				result += '……'.repeat(Math.floor(runLength / 3));
				result += '.'.repeat(runLength % 3);
			} else {
				result += text.slice(i, runEnd);
			}
			i = runEnd - 1;
			continue;
		}

		if (protectedMask[i] || !inChineseContext || !selected[current]) {
			result += current;
			continue;
		}

		if (isTechnicalPunctuation(text, i, current)) {
			result += current;
			continue;
		}

		if (current === "'") {
			result += singleQuoteOpen ? '’' : '‘';
			singleQuoteOpen = !singleQuoteOpen;
			continue;
		}

		if (current === '"') {
			result += doubleQuoteOpen ? '”' : '“';
			doubleQuoteOpen = !doubleQuoteOpen;
			continue;
		}

		result += replacements[current] ?? current;
	}

	return result;
}
