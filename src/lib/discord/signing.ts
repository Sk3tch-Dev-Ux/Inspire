// Ed25519 signature verification for Discord interactions.
// Discord signs every webhook with the application's public key; we MUST
// verify this before doing anything, including parsing the body.

import nacl from 'tweetnacl';

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex length');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

export function verifyDiscordSignature(
  rawBody: string,
  signatureHex: string | null,
  timestamp: string | null,
  publicKeyHex: string,
): boolean {
  if (!signatureHex || !timestamp) return false;
  try {
    const message = new TextEncoder().encode(timestamp + rawBody);
    return nacl.sign.detached.verify(
      message,
      hexToBytes(signatureHex),
      hexToBytes(publicKeyHex),
    );
  } catch {
    return false;
  }
}
