import { OCR_API_KEY } from '$env/static/private';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
    let formData = await request.formData();
    let file = formData.get('file');
    if (!file) throw error(400, 'No image provided');

    let body = new FormData();
    body.append('file', file);
    body.append('apikey', OCR_API_KEY);
    body.append('language', 'eng');
    body.append('isTable', 'true');
    body.append('OCREngine', '2');
    body.append('scale', 'true');
    body.append('isOverlayRequired', 'false');

    let res = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body
    });

    if (!res.ok) throw error(res.status, 'OCR API request failed');

    let data = await res.json();

    if (data.IsErroredOnProcessing || data.OCRExitCode !== 1) {
        throw error(500, data.ParsedResults?.[0]?.ErrorMessage || 'OCR failed');
    }

    let text = data.ParsedResults?.[0]?.ParsedText || '';
    if (!text.trim()) throw error(500, 'OCR returned nothing');

    return json({ text });
}
