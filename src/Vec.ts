import { VecLike } from "./types.ts"

function calcLength(x: number, y: number){
    return Math.sqrt(x**2 + y**2)
}

function calcLengthSquared(x: number, y: number){
    return x**2 + y**2
}

function unsignedMod(a: number, b: number){
    return ((a % b) + b) % b
}

export class Vec{
    x: number
    y: number

    // --- Constructors --- //

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }

    static fromArray(arr: [number, number]): Vec {
        return new Vec(arr[0], arr[1])
    }

    static fromVecLike(v: VecLike): Vec {
        return new Vec(v.x, v.y)
    }

    static fromAngle(angle: number, length=1): Vec {
        return new Vec(Math.cos(angle) * length, Math.sin(angle) * length)
    }

    // --- Length & Angle --- //

    get length(): number { 
        return Math.sqrt(this.x**2 + this.y**2) 
    }
    set length(n: number){
        const length = this.length
        if(length === 0){
            this.x = n
        } else {
            this.mul(n/length)
        }
    }

    get lengthSquared(): number { 
        return this.x**2 + this.y**2 
    }

    get angle(): number { 
        return Math.atan2(this.y, this.x) || 0 
    }
    set angle(n: number){ 
        const length = this.length
        this.x = Math.cos(n) * length
        this.y = Math.sin(n) * length
    }

    // --- Copy --- //

    copy(): Vec {
        return new Vec(this.x, this.y)
    }

    /** Shorthand for copy() */
    get c(): Vec {
        return new Vec(this.x, this.y)
    }

    // --- Basic Operators --- //

    add(v: VecLike): this {
        this.x += v.x
        this.y += v.y
        return this
    }
    addN(x: number, y: number): this {
        this.x += x
        this.y += y
        return this
    }

    sub(v: VecLike): this {
        this.x -= v.x
        this.y -= v.y
        return this
    }
    subN(x: number, y: number): this {
        this.x -= x
        this.y -= y
        return this
    }

    /** Substraction but with the operands reversed. */
    to(v: VecLike): this { 
        this.x = v.x - this.x
        this.y = v.y - this.y
        return this
    }
    toN(x: number, y: number): this { 
        this.x = x - this.x
        this.y = y - this.y
        return this
    }

    neg(): this { 
        this.x = -this.x
        this.y = -this.y
        return this 
    }
    negX(): this { 
        this.x = -this.x
        return this 
    }
    negY(): this { 
        this.y = -this.y
        return this 
    }

    mul(n: number): this { 
        this.x *= n 
        this.y *= n
        return this 
    }
    mulV(v: VecLike): this { 
        this.x *= v.x 
        this.y *= v.y
        return this 
    }
    mulN(x: number, y: number): this { 
        this.x *= x 
        this.y *= y
        return this 
    }

    div(n: number): this { 
        this.x /= n 
        this.y /= n
        return this 
    }
    divV(v: VecLike): this { 
        this.x /= v.x 
        this.y /= v.y
        return this 
    }
    divN(x: number, y: number): this { 
        this.x /= x 
        this.y /= y
        return this 
    }

    // --- Vector Math Operators --- //
    
    dot(v: VecLike): number { 
        return this.x * v.x + this.y * v.y 
    }
    dotN(x: number, y: number): number { 
        return this.x * x + this.y * y 
    }
    cross(v: VecLike): number {
        return this.length * calcLength(v.x, v.y) * Math.sin( this.angleTo(v) ) 
    }
    crossN(x: number, y: number): number {
        return this.length * calcLength(x, y) * Math.sin( this.angleToN(x, y) ) 
    }

    normalize(length=1): this {
        this.length = length
        return this
    }

    rotate(angle: number): this {
        this.angle = this.angle + angle
        return this
    }
    setAngle(angle: number): this {
        this.angle = angle
        return this
    }

    angleTo(v: VecLike): number { 
        return (Math.atan2(v.y, v.x) || 0) - this.angle 
    }
    angleToN(x: number, y: number): number { 
        return (Math.atan2(y, x) || 0) - this.angle 
    }

    distTo(v: VecLike): number { 
        return calcLength(v.x - this.x, v.y - this.y) 
    }
    distToN(x: number, y: number): number { 
        return calcLength(x - this.x, y - this.y)
    }

    // --- Math Operators --- //

    abs(): this { 
        this.x = Math.abs(this.x)
        this.y = Math.abs(this.y)
        return this
    }
    absX(): this {
        this.x = Math.abs(this.x)
        return this
    }
    absY(): this { 
        this.y = Math.abs(this.y)
        return this
    }

    floor(): this { 
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
        return this
    }
    floorX(): this {
        this.x = Math.floor(this.x)
        return this
    }
    floorY(): this { 
        this.y = Math.floor(this.y)
        return this
    }

    ceil(): this { 
        this.x = Math.ceil(this.x)
        this.y = Math.ceil(this.y)
        return this
    }
    ceilX(): this {
        this.x = Math.ceil(this.x)
        return this
    }
    ceilY(): this { 
        this.y = Math.ceil(this.y)
        return this
    }

    round(): this { 
        this.x = Math.round(this.x)
        this.y = Math.round(this.y)
        return this
    }
    roundX(): this {
        this.x = Math.round(this.x)
        return this
    }
    roundY(): this { 
        this.y = Math.round(this.y)
        return this
    }

    /** Floor to the nearest multiple of `mult`. */
    floorTo(mult: VecLike, offset: VecLike = {x: 0, y: 0}): this {
        this.x = Math.floor((this.x + offset.x) / mult.x ) * mult.x
        this.y = Math.floor((this.y + offset.y) / mult.y ) * mult.y
        return this
    }
    floorToX(floor: number, offset=0): this {
        this.x = Math.floor((this.x + offset) / floor ) * floor
        return this
    }
    floorToY(floor: number, offset=0): this {
        this.y = Math.floor((this.y + offset) / floor ) * floor
        return this
    }

    signedMod(v: VecLike): this {
        this.x = this.x % v.x
        this.y = this.y % v.y
        return this
    }
    signedModN(x: number, y: number): this {
        this.x = this.x % x
        this.y = this.y % y
        return this
    }
    signedModX(n: number): this {
        this.x = this.x % n
        return this
    }
    signedModY(n: number): this {
        this.y = this.y % n
        return this
    }

    mod(v: VecLike): this {
        this.x = unsignedMod(this.x, v.x)
        this.y = unsignedMod(this.y, v.y)
        return this
    }
    modN(x: number, y: number): this {
        this.x = unsignedMod(this.x, x)
        this.y = unsignedMod(this.y, y)
        return this
    }
    modX(n: number): this {
        this.x = unsignedMod(this.x, n)
        return this
    }
    modY(n: number): this {
        this.y = unsignedMod(this.y, n)
        return this
    }

    min(v: VecLike): this { 
        this.x = Math.min(this.x, v.x)
        this.y = Math.min(this.y, v.y)
        return this
    }
    minN(x: number, y: number): this { 
        this.x = Math.min(this.x, x)
        this.y = Math.min(this.y, y)
        return this
    }

    max(v: VecLike): this { 
        this.x = Math.max(this.x, v.x)
        this.y = Math.max(this.y, v.y)
        return this
    }
    maxN(x: number, y: number): this { 
        this.x = Math.max(this.x, x)
        this.y = Math.max(this.y, y)
        return this
    }

    clamp(min: VecLike, max: VecLike): this {
        this.x = Math.max(Math.min(this.x, max.x), min.x)
        this.y = Math.max(Math.min(this.y, max.y), min.y)
        return this
    }
    clampN(xMin: number, yMin: number, xMax: number, yMax: number): this {
        this.x = Math.max(Math.min(this.x, xMax), xMin)
        this.y = Math.max(Math.min(this.y, yMax), yMin)
        return this
    }

    // --- Comparison Operators --- //

    equal(v: VecLike): boolean { 
        return this.x === v.x && this.y === v.y 
    }
    equalN(x: number, y: number): boolean { 
        return this.x === x && this.y === y 
    }

    near(v: VecLike, dist = 1): boolean { 
        return calcLengthSquared(v.x - this.x, v.y - this.y) <= dist*dist 
    }
    nearN(x: number, y: number, dist = 1): boolean{ 
        return calcLengthSquared(x - this.x, y - this.y) <= dist*dist 
    }

    // --- Miscellaneous --- //

    toString(): string {
        return `(${this.x}, ${this.y})`
    }

    toArray(): [number, number] {
        return [this.x, this.y]
    }

    set(v: VecLike): this {
        this.x = v.x
        this.y = v.y
        return this
    }
    setN(x: number, y: number): this {
        this.x = x
        this.y = y
        return this
    }
    setX(n: number): this {
        this.x = n
        return this
    }
    setY(n: number): this {
        this.y = n
        return this
    }

    // --- Constants --- //

    static zero: VecLike = { x: 0, y: 0 };
    static one: VecLike = { x: 1, y: 1 };
    static minusOne: VecLike = { x: -1, y: -1 };
    
    static left: VecLike = { x: -1, y: 0 };
    static right: VecLike = { x: 1, y: 0 };
    static up: VecLike = { x: 0, y: -1 };
    static down: VecLike = { x: 0, y: 1 };
    
    static center: VecLike = { x: 0.5, y: 0.5 };
    
    static topLeft: VecLike = { x: 0, y: 0 };
    static topMiddle: VecLike = { x: 0.5, y: 0 };
    static topRight: VecLike = { x: 1, y: 0 };
    
    static middleLeft: VecLike = { x: 0, y: 0.5 };
    static middleMiddle: VecLike = { x: 0.5, y: 0.5 };
    static middleRight: VecLike = { x: 1, y: 0.5 };
    
    static bottomLeft: VecLike = { x: 0, y: 1 };
    static bottomMiddle: VecLike = { x: 0.5, y: 1 };
    static bottomRight: VecLike = { x: 1, y: 1 };
}