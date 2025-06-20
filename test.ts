import { assertEquals } from "jsr:@std/assert@^1.0.13";
import { b_s, b_s16, b_s64, hex, s16_b, s64_b, s_b } from "./mod.ts";

const rfc = await fetch("https://www.rfc-editor.org/rfc/rfc4648.txt")
  .then(($) => $.text());
Deno.test("rfc", () => {
  rfc.slice(26521, 26723).matchAll(/^ {3}BASE16\("(\w*)"\) = "(\w*)"/gm)
    .forEach(([_, ascii, base16]) => {
      const binary = new TextEncoder().encode(ascii);
      assertEquals(b_s16(binary), base16.toLowerCase());
      assertEquals(s16_b(base16), binary);
      assertEquals(s16_b(base16.toLowerCase()), binary);
      assertEquals(hex(base16), binary);
      assertEquals(hex(base16.toLowerCase()), binary);
    });
  rfc.slice(25710, 25906).matchAll(/^ {3}BASE64\("(\w*)"\) = "(\w*)"/gm)
    .forEach(([_, ascii, base64]) =>
      assertEquals(b_s64(new TextEncoder().encode(ascii)), base64)
    );
});
Deno.test("same", () =>
  [
    new Uint8Array(0),
    new Uint8Array([-1]),
    new Uint8Array(256),
    new Uint8Array(256).fill(-1),
    Uint8Array.from({ length: 256 }, (_, Z) => Z),
    new Uint8Array(4096).fill(-1),
  ].forEach(($) => {
    assertEquals(s16_b(b_s16($)), $);
    assertEquals(s64_b(b_s64($)), $);
    assertEquals(b_s(s_b(`${$}`)), `${$}`);
  }));
