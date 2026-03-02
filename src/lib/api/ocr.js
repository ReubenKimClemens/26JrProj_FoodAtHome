export async function getTextFromImage(imageFile) {
    let body = new FormData();
    body.append('file', imageFile);

    let res = await fetch('/api/ocr', { method: 'POST', body });

    if (!res.ok) {
        let msg = await res.text().catch(() => 'OCR request failed');
        throw new Error(msg);
    }

    let { text } = await res.json();
    if (!text?.trim()) throw new Error('OCR returned empty text');

    return text;
}
