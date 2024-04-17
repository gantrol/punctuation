import { test, expect } from '@playwright/test';
import {
    apiItemsAllTrue,
    baseCase,
    baseCaseAllTrueResult,
    baseCaseClaudeResult,
    MODE_ALL,
    MODE_CLAUDE
} from "$lib/testdata.test.js";

test('baseCaseAllTrueResult', async ({ request }) => {
    // Replace localhost:5000 with your SvelteKit server address and ensure it's running
    const response = await request.post('/api/2zh', {
        data:{
            text: baseCase,
            items: apiItemsAllTrue
        },
    });

    expect(response.ok()).toBeTruthy();
    // make sure the conversion was done correctly
    const resp = await response.json()
    expect(resp.result).toEqual(baseCaseAllTrueResult);
});

test('baseCaseModeAll', async ({ request }) => {
    // Replace localhost:5000 with your SvelteKit server address and ensure it's running
    const response = await request.post('/api/2zh', {
        data:{
            text: baseCase,
            mode: MODE_ALL
        },
    });

    expect(response.ok()).toBeTruthy();
    // make sure the conversion was done correctly
    const resp = await response.json()
    expect(resp.result).toEqual(baseCaseAllTrueResult);
});

test('baseCaseModeClaude', async ({ request }) => {
    // Replace localhost:5000 with your SvelteKit server address and ensure it's running
    const response = await request.post('/api/2zh', {
        data:{
            text: baseCase,
            mode: MODE_CLAUDE
        },
    });

    expect(response.ok()).toBeTruthy();
    // make sure the conversion was done correctly
    const resp = await response.json()
    expect(resp.result).toEqual(baseCaseClaudeResult);
});
