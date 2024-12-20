# vector2d

Lightweight TS library for 2D vectors.

### Quick Start

```typescript
import { Vec } from "jsr:@coin/vector2d"

const v1 = new Vec(1, 2)
const v2 = Vec.fromArray([3, 4])
const v3 = Vec.from({x: 5, y: 6})

// Most methods modify the left vector.
v1.add(v2) // v1 is now (4, 6)

// To not modify the left vector and create a new one, you can :
const v4 = v1.copy().add(v2)
// or
const v5 = Vec.from(v1).add(v2)

// Methods that change the left vector always return 'this'.
const v6 = Vec.from(v3).add(v1).mul(2).subN(10, 11).mulV(v2)
```

