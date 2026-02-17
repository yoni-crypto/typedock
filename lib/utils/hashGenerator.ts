export interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

async function digestMessage(algorithm: string, message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// MD5 implementation (not available in Web Crypto API)
function md5(str: string): string {
  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
  }

  function addUnsigned(x: number, y: number): number {
    return (x + y) >>> 0;
  }

  function fFunc(x: number, y: number, z: number): number {
    return (x & y) | (~x & z);
  }

  function gFunc(x: number, y: number, z: number): number {
    return (x & z) | (y & ~z);
  }

  function hFunc(x: number, y: number, z: number): number {
    return x ^ y ^ z;
  }

  function iFunc(x: number, y: number, z: number): number {
    return y ^ (x | ~z);
  }

  const utf8Encode = new TextEncoder();
  const bytes = utf8Encode.encode(str);
  const messageLenBytes = bytes.length;
  const numBlocks = ((messageLenBytes + 8) >>> 6) + 1;
  const totalLen = numBlocks << 4;
  const words = new Uint32Array(totalLen);

  for (let i = 0; i < messageLenBytes; i++) {
    words[i >>> 2] |= bytes[i] << ((i % 4) << 3);
  }

  words[messageLenBytes >>> 2] |= 0x80 << ((messageLenBytes % 4) << 3);
  words[totalLen - 2] = messageLenBytes << 3;
  words[totalLen - 1] = messageLenBytes >>> 29;

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
  const k = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000);
  }

  for (let i = 0; i < numBlocks; i++) {
    const offset = i << 4;
    let aa = a, bb = b, cc = c, dd = d;

    for (let j = 0; j < 64; j++) {
      let func, gIndex;
      if (j < 16) {
        func = fFunc(b, c, d);
        gIndex = j;
      } else if (j < 32) {
        func = gFunc(b, c, d);
        gIndex = (5 * j + 1) % 16;
      } else if (j < 48) {
        func = hFunc(b, c, d);
        gIndex = (3 * j + 5) % 16;
      } else {
        func = iFunc(b, c, d);
        gIndex = (7 * j) % 16;
      }

      const temp = d;
      d = c;
      c = b;
      b = addUnsigned(b, rotateLeft(addUnsigned(addUnsigned(a, func), addUnsigned(k[j], words[offset + gIndex])), s[(j >>> 2) % 4 + ((j >>> 4) << 2)]));
      a = temp;
    }

    a = addUnsigned(a, aa);
    b = addUnsigned(b, bb);
    c = addUnsigned(c, cc);
    d = addUnsigned(d, dd);
  }

  return [a, b, c, d].map(x => x.toString(16).padStart(8, '0')).join('');
}

export async function generateHashes(input: string): Promise<HashResult> {
  const [sha1, sha256, sha512] = await Promise.all([
    digestMessage('SHA-1', input),
    digestMessage('SHA-256', input),
    digestMessage('SHA-512', input)
  ]);

  return {
    md5: md5(input),
    sha1,
    sha256,
    sha512
  };
}
