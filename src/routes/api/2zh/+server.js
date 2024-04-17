import { punctuationToChinese } from '$lib';
import { json, error } from '@sveltejs/kit';
import {checkItemsAllTrue, checkItemsClaude, MODE_ALL, MODE_CLAUDE} from "$lib/testdata.test.js";

export async function POST({ request }) {
    const req_json = await request.json();
    console.log(req_json);
    const { text, items, mode } = req_json;
    if (typeof text !== "string" && (mode !== MODE_ALL && mode !== MODE_CLAUDE || typeof items !== "object")) {
        throw error(400, 'Invalid request format. Ensure `text` is a string, and mode is all or claude, or `checkItems` is an array.');
    }

    let finalCheckItems;

    if (mode === MODE_ALL) {
        finalCheckItems = checkItemsAllTrue;
    } else if (mode === MODE_CLAUDE) {
        finalCheckItems = checkItemsClaude;
    } else {
        finalCheckItems = items.reduce((acc, item) => {
            acc[item] = true;
            return acc;
        }, {});
    }

    debugger;
    const result = punctuationToChinese(text, finalCheckItems);

    return json({ result }, { status: 200 });
}
