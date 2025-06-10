# base

Encode and decode binary data ([RFC 4648](https://rfc-editor.org/rfc/rfc4648)).

## base64url

```ts
import { b_s64, s64_b } from "@nyoon/base/64";
import { assertEquals, assertMatch } from "@std/assert";

const binary = crypto.getRandomValues(new Uint8Array(32));
const base64url = b_s64(binary);

assertMatch(base64url, /^[-\w]{43}$/);
assertEquals(s64_b(base64url), binary);
```
