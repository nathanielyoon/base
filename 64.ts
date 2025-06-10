/**
 * Base64 encoding and decoding, with constants from
 * [ConstTimeEncoding](https://github.com/Sc00bz/ConstTimeEncoding).
 * @module
 */

const en64 = ($: number) =>
  $ + 65 + (25 - $ >> 8 & 6) - (51 - $ >> 8 & 75) - (61 - $ >> 8 & 13) +
  (62 - $ >> 8 & 49);
const de64 = ($: number) =>
  ((64 - $ & $ - 91) >> 8 & $ - 64) + ((96 - $ & $ - 123) >> 8 & $ - 70) +
  ((45 - $ & $ - 58) >> 8 & $ + 5) + ((44 - $ & $ - 46) >> 8 & 63) +
  ((94 - $ & $ - 96) >> 8 & 64) - 1;
/** Encodes binary to base64. */
export const b_s64 = ($: Uint8Array): string => {
  // The `length` parameter only takes integers, so this `+ 0.7` is `Math.ceil`.
  const a = new Uint8Array($.length / 3 * 4 + 0.7);
  for (let z = 0, y = 0, b, c, d; z < $.length;) {
    b = $[z++], c = $[z++], d = $[z++];
    a[y++] = en64(b >> 2), a[y++] = en64(b << 4 & 63 | c >> 4);
    a[y++] = en64(c << 2 & 63 | d >> 6), a[y++] = en64(d & 63);
  }
  return new TextDecoder().decode(a);
};
/** Decodes binary from base64. */
export const s64_b = ($: string): Uint8Array => {
  const a = new Uint8Array($.length * 3 >> 2), b = $.charCodeAt.bind($);
  for (let z = 0, y = 0, c, d, e, f; z < $.length;) {
    c = de64(b(z++)), d = de64(b(z++)), e = de64(b(z++)), f = de64(b(z++));
    a[y++] = c << 2 | d >> 4, a[y++] = d << 4 | e >> 2, a[y++] = e << 6 | f;
  }
  return a;
};
