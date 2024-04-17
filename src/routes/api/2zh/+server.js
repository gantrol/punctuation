import { punctuationToChinese } from '$lib';
import { json, error } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    const req_json = await request.json();
    console.log(req_json);
    debugger;
    const { text, checkItems } = req_json;
    console.log(checkItems);
    if (typeof text !== 'string' || typeof checkItems !== 'object') {
        throw error(400, 'Invalid request format. Ensure `text` is a string and `checkItems` is an object.');
    }

    const result = punctuationToChinese(text, checkItems);

    return json({ result }, { status: 200 });
}
