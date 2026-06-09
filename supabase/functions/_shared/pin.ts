function toHex(buf: Uint8Array): string {
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex: string): Uint8Array {
  const buf = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) buf[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  return buf;
}

export async function hashPin(pin: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']);
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 },
    key, 256
  );
  return `pbkdf2:100000:${toHex(salt)}:${toHex(new Uint8Array(hash))}`;
}

export async function verifyPin(pin: string, stored: string): Promise<boolean> {
  if (stored.startsWith('pbkdf2:')) {
    const [, iterStr, saltHex, expectedHex] = stored.split(':');
    const salt = fromHex(saltHex);
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']);
    const hash = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: parseInt(iterStr) },
      key, 256
    );
    return toHex(new Uint8Array(hash)) === expectedHex;
  }
  // Legacy SHA-256 (buzz_salt_ + pin)
  const data = new TextEncoder().encode('buzz_salt_' + pin);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return toHex(new Uint8Array(hash)) === stored;
}
