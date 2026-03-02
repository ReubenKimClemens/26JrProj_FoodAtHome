export async function compressImage(file, maxBytes = 1_000_000) {
    if (file.size <= maxBytes) return file;
  
    let bitmap = await createImageBitmap(file);
    let canvas = document.createElement('canvas');
    let scale = Math.sqrt(maxBytes / file.size);
    canvas.width = Math.floor(bitmap.width * scale);
    canvas.height = Math.floor(bitmap.height * scale);
  
    let ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  
    let blob = await new Promise(resolve =>
      canvas.toBlob(resolve, 'image/jpeg', 0.85)
    );
  
    return new File([blob], 'receipt.jpg', { type: 'image/jpeg' });
  }