import { describe, it, expect } from 'vitest';
import { punctuationToChinese } from './index';
import { DoNotChange, baseCase } from './testdata.test';

describe('test punctuationToChinese', () => {
	// TODO: 空格怎么办？
	it('Does not change string for the elements in DoNotChange array', () => {
		for (let testString of DoNotChange) {
			expect(punctuationToChinese(testString, {})).toBe(testString);
		}
	});

	it('Replaces punctuation in baseCase string', () => {
		const expectedResult = "有人说过：那是最美好的时代，那是最糟糕的时代；那是睿智的年月，那是萌妹的年月；那是信心百倍的时期，那是疑虑重重的时期；那是阳光……";
		const replacedString = punctuationToChinese(baseCase, {',': true, '.': true, ':': true, ';': true, '...': true});
		expect(replacedString).toBe(expectedResult);
	});

});



