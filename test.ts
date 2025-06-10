import { assertEquals } from "@std/assert";

Deno.test("rfc", () =>
  fetch("https://rfc-editor.org/rfc/rfc4648.txt").then(($) => $.text())
    .then(($) =>
      $.slice(25710, 25906).matchAll(/^ {3}BASE64\("(\w*)"\) = "(\w*)"/gm)
        .forEach(([_, ascii, base64]) =>
          assertEquals(b_s64(new TextEncoder().encode(ascii)), base64)
        )
    ));
Deno.test("same", () =>
  [
    new Uint8Array(0),
    new Uint8Array([-1]),
    new Uint8Array(256),
    new Uint8Array(256).fill(-1),
    Uint8Array.from({ length: 256 }, (_, Z) => Z),
    new Uint8Array(4096).fill(-1),
  ].forEach(($) => assertEquals(s64_b(b_s64($)), $)));
