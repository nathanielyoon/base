# base

Encode and decode binary data ([RFC 4648](https://rfc-editor.org/rfc/rfc4648)).

## base16

```ts
import { b_s16, hex, s16_b } from "@nyoon/base/16";
import { assertEquals, assertMatch } from "@std/assert";

const binary = crypto.getRandomValues(new Uint8Array(32));
const base16 = b_s16(binary);

assertMatch(base16, RegExp(`^[\\da-f]{${binary.length * 2}}$`));
assertEquals(s16_b(base16), binary);
assertEquals(
  hex(JSON.stringify([...binary].map(($) => $.toString(16).padStart(2, "0")))),
  binary,
);
```

## base64url

```ts
import { b_s64, s64_b } from "@nyoon/base/64";
import { assertEquals, assertMatch } from "@std/assert";

const binary = crypto.getRandomValues(new Uint8Array(32));
const base64url = b_s64(binary);

assertMatch(base64url, RegExp(`^[-\\w]{${Math.ceil(binary.length / 3 * 4)}}$`));
assertEquals(s64_b(base64url), binary);
```
