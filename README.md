# vector2d

Lightweight TS library for 2D vectors.

### Quick Start

```typescript
import { Vec } from "jsr:@coin/vector2d"

const v1 = new Vector(1, 2)
const v2 = Vector.fromArray([3, 4])

// Most methods modify the left vector.
v1.add(v2) // v1 is now (4, 6)

// To not modify the left vector and create a new one, you can :
const v3 = v1.copy().add(v2)
// or
const v4 = v1.c.add(v2)
```

