# base

Encode and decode binary data ([RFC 4648](https://rfc-editor.org/rfc/rfc4648)).

```ts
import { b_s, b_s16, b_s64, hex, s16_b, s64_b, s_b } from "@nyoon/base";
import { assertEquals, assertMatch } from "jsr:@std/assert@^1.0.13";

const binary = crypto.getRandomValues(new Uint8Array(32));

const base16 = b_s16(binary);
assertMatch(base16, RegExp(`^[\\da-f]{${binary.length * 2}}$`));
assertEquals(s16_b(base16), binary);
assertEquals(
  hex(JSON.stringify([...binary].map(($) => $.toString(16).padStart(2, "0")))),
  binary,
);

const base64url = b_s64(binary);
assertMatch(base64url, RegExp(`^[-\\w]{${Math.ceil(binary.length / 3 * 4)}}$`));
assertEquals(s64_b(base64url), binary);

assertEquals(b_s(s_b(`${binary}`)), `${binary}`);
```
