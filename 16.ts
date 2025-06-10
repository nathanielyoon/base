const BIN = new Uint8Array(256), HEX = Array<string>(256);
for (let z = 0; z < 16; ++z) BIN[z.toString(16).charCodeAt(0)] = z;
for (let z = 0; z < 256; ++z) HEX[z] = z.toString(16).padStart(2, "0");
/** Encodes binary to base16. */
export const b_s16 = ($: Uint8Array): string => {
  let a = "";
  for (let z = 0; z < $.length; ++z) a += HEX[$[z]];
  return a;
};
/** Decodes binary from base16. */
export const s16_b = ($: string): Uint8Array => {
  const a = new Uint8Array($.length >> 1), b = $.charCodeAt.bind($);
  for (let z = 0; z < $.length;) a[z >> 1] = BIN[b(z++)] << 4 | BIN[b(z++)];
  return a;
};
export const hex = ($: string): Uint8Array =>
  Uint8Array.from(
    $.match(
      /(?<=(?:^|0x|\W)(?:[\da-f]{2})*)[\da-f]{2}(?=(?:[\da-f]{2})*(?:\W|$))/g,
    ) ?? [],
    ($) => parseInt($, 16),
  );
