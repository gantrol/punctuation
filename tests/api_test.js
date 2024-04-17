import { test, expect } from '@playwright/test';
import {baseCase, baseCaseAllTrueResult, checkItemsAllTrue} from "$lib/testdata.test.js";

test('calling 2zh api', async ({ request }) => {
    // Replace localhost:5000 with your SvelteKit server address and ensure it's running
    const response = await request.post('/api/2zh', {
        data:{
            text: baseCase,
            checkItems: checkItemsAllTrue
        },
    });

    expect(response.ok()).toBeTruthy();
    // make sure the conversion was done correctly
    const resp = await response.json()
    expect(resp.result).toEqual(baseCaseAllTrueResult);
});
