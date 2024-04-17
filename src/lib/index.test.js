import { describe, it, expect } from 'vitest';
import { punctuationToChinese } from './index';
import {DoNotChange, baseCase, baseCaseAllTrueResult, checkItemsAllTrue} from './testdata.test';

describe('test punctuationToChinese', () => {
	// TODO: 空格怎么办？
	it('Does not change string for the elements in DoNotChange array', () => {
		for (let testString of DoNotChange) {
			expect(punctuationToChinese(testString, {',': true, '.': true, ':': true, ';': true, '...': true, ')': true})).toBe(testString);
		}
	});

	it('Replaces punctuation in baseCase string', () => {
		const replacedString = punctuationToChinese(baseCase, checkItemsAllTrue);
		expect(replacedString).toBe(baseCaseAllTrueResult);
	});

});



