let round = (n) => Math.round(n * 100) / 100;

export function parseReceipt(receiptText) {
    let lines = receiptText.split('\n').map(l => l.trim()).filter(Boolean);
    return {
        storeName: getStoreName(lines),
        date: getDate(lines),
        total: getTotal(lines),
        items: getItems(lines)
    };
}

function getStoreName(lines) {
    let junk = ['expect more', 'pay less', 'save money', 'live better'];
    for (let i = 0; i < 5 && i < lines.length; i++) {
        let name = lines[i].replace(/^[^a-zA-Z]+/, '');
        for (let j of junk) {
            let at = name.toLowerCase().indexOf(j);
            if (at > -1) name = name.slice(0, at);
        }
        name = name.replace(/[^a-zA-Z\s']/g, '').trim();
        if (name.length >= 3) return name;
    }
    return lines[0] || 'Unknown Store';
}

function getDate(lines) {
    for (let l of lines) {
        let m = l.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
        if (m) return m[1];
    }
    return new Date().toLocaleDateString();
}

function grabPrice(line) {
    let m = line.match(/\$?\s?(\d+\.\d{2})/);
    return m ? parseFloat(m[1]) : null;
}

function getTotal(lines) {
    for (let i = lines.length - 1; i >= 0; i--) {
        let low = lines[i].toLowerCase();
        if (/\btotal\b/.test(low) && !low.includes('subtotal') && !low.includes('tax')) {
            let val = grabPrice(lines[i]);
            if (val) return val;
        }
    }
    return addUpParts(lines);
}

function addUpParts(lines) {
    let parts = { subtotal: 0, tax: 0, tip: 0 };

    for (let i = 0; i < lines.length; i++) {
        let low = lines[i].toLowerCase();
        let key = null;
        if (low.includes('subtotal') || low.includes('sub total')) key = 'subtotal';
        else if (low.includes('tax')) key = 'tax';
        else if (low.includes('tip') || low.includes('gratuity')) key = 'tip';
        if (!key) continue;

        let val = grabPrice(lines[i]);
        if (!val && i + 1 < lines.length) {
            val = grabPrice(lines[i + 1]);
            if (val) i++;
        }
        if (!val) continue;

        if (key === 'tax') parts.tax += val;
        else parts[key] = val;
    }
    if (!parts.subtotal) return 0;
    return round(parts.subtotal + parts.tax + parts.tip);
}

function getItems(lines) {
    let ignore = ['total', 'subtotal', 'tax', 'tip', 'gratuity', 'change',
        'cash', 'visa', 'mastercard', 'debit', 'credit', 'tend'];
    let items = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let low = line.toLowerCase();
        if (ignore.some(w => low.includes(w))) continue;

        let pm = line.match(/\$?\s?(\d+\.\d{2})\s*[A-Z]?\s*$/);
        if (!pm) continue;

        let price = parseFloat(pm[1]);
        let name = line.slice(0, pm.index).trim();
        if (name.length < 2) continue;

        name = name.replace(/\s*\d{8,}\s*/g, ' ').replace(/\s+[A-Z]$/, '').replace(/\s{2,}/g, ' ').trim();

        let qty = 1;
        let frontMatch = name.match(/^(\d+)\s*[x@]\s+(.+)/i);
        if (frontMatch) {
            qty = parseInt(frontMatch[1]);
            name = frontMatch[2].trim();
        } else {
            let colMatch = name.match(/^(.+?)\s{2,}(\d+)\s*$/);
            if (colMatch && parseInt(colMatch[2]) <= 99) {
                qty = parseInt(colMatch[2]);
                name = colMatch[1].trim();
            }
        }

        if (i + 1 < lines.length) {
            let nxt = lines[i + 1].match(/^(\d+)\s*@\s*\$?(\d+\.\d{2})/);
            if (nxt) { qty = parseInt(nxt[1]); i++; }
        }

        items.push({
            id: Date.now() + items.length,
            itemName: name,
            quantity: qty,
            price,
            category: 'Misc'
        });
    }
    return items;
}
