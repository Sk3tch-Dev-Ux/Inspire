// Smoke test for the signature verifier. Run with:
//   docker exec inspire-web npx tsx src/lib/discord/signing.test.ts
// (No test runner installed in the project; this is a self-running script.)

import nacl from 'tweetnacl';
import { verifyDiscordSignature } from './signing';

function bytesToHex(b: Uint8Array): string {
  return Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('');
}

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error(`✗ ${msg}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${msg}`);
  }
}

const kp = nacl.sign.keyPair();
const publicKeyHex = bytesToHex(kp.publicKey);
const body = '{"type":1}';
const timestamp = '1700000000';
const sig = nacl.sign.detached(new TextEncoder().encode(timestamp + body), kp.secretKey);
const sigHex = bytesToHex(sig);

assert(
  verifyDiscordSignature(body, sigHex, timestamp, publicKeyHex) === true,
  'valid signature accepted',
);
assert(
  verifyDiscordSignature(body, sigHex, timestamp, '00'.repeat(32)) === false,
  'wrong public key rejected',
);
assert(
  verifyDiscordSignature(body + 'tampered', sigHex, timestamp, publicKeyHex) === false,
  'tampered body rejected',
);
assert(
  verifyDiscordSignature(body, sigHex, '1700000001', publicKeyHex) === false,
  'tampered timestamp rejected',
);
assert(
  verifyDiscordSignature(body, null, timestamp, publicKeyHex) === false,
  'missing signature rejected',
);
assert(
  verifyDiscordSignature(body, sigHex, null, publicKeyHex) === false,
  'missing timestamp rejected',
);
assert(
  verifyDiscordSignature(body, 'not-hex', timestamp, publicKeyHex) === false,
  'malformed signature rejected (no throw)',
);

if (process.exitCode) {
  console.error('\nFAIL');
  process.exit(1);
} else {
  console.log('\nPASS');
}
