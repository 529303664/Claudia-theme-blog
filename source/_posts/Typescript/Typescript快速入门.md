---
title: Typescript快速入门
tags: [Typescript]
categories: [编程语言]
version: 1
date: 2022-03-06 10:42:27
---

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
>
> Any browser. Any host. Any OS. Open source.

漫漫前端路，语言何其多。行走在前端开发的道路上，新鲜事物层出不穷，你是否有些应接不暇呢？在众多耀眼的前端语言明星中，TypeScript 无疑是你值得探究一番的那一颗（~~对，就是这么武断~~）。

<!-- more -->

# Types

大家都知道 JavaScript 是一种弱类型语言，想必很多人也知道不少有关自动类型转换的奇技淫巧。弱类型在我们写代码时带来了不少便利，也为面试题扩充了不少题库，但同时也埋下了一个个地雷，时不时踩一个。尤其是写一些基础库时，为了使用者的正确使用，要编写各种冗长的使用文档，遇上~~不靠谱~~不看文档的开发者，不仅要花时间解释用法，有时为了代码鲁棒性还得做各种各样的校验和兼容，费时费力。这时候类似 TypeScript 的强类型语言的优势就体现出来了，不按正确的方式调用编译都通不过，把问题直接挡在门外。

那么问题来了：“我习惯了开发 JavaScript，会不会很难接受 TypeScript 啊？”这个问题暂时放放，我们先来看看 TypeScript 的类型究竟是啥。

## Primitive Types

说到**基本类型**，首先就能想到御三家：`string`、`number` 和 `boolean`，这三个类型在 TypeScript 的类型体系中占据了半壁江山，为其他复杂类型奠定了基石。

要指定一个变量的类型很简单，在 JavaScript 的变量声明后加上 `: type` 就可以了。

```typescript
const numberVal: number = 0;
const booleanVal: boolean = true;
const stringVal: string = 'string';
```

赋值、使用变量时和 JavaScript 完全一样。

```typescript
let numberVal: number = 0;
numberVal += 10;
console.log(`Value: ${numberVal}`);
```

对于有初值并且类型唯一的变量，我们也可以省略类型的声明，由 TypeScript 自动推导。

```typescript
let inferredNumberVal = 1;
inferredNumberVal = 2;
```

当变量被赋予错误类型的值，或是用于错误的函数时，TypeScript 会给出错误。

```typescript
let numberVal: number = 0;
numberVal = '1'; // TS2322: Type '"1"' is not assignable to type 'number'.
stringVal.localeCompare(numberVal); // TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

`symbol` 的使用与 `string` 等大同小异，至于 `null` 和 `undefined` 放到后文再说。

## Array

数组也是很常见的数据类型，定义也很浅显易懂。

```typescript
let list: number[] = [1, 2, 3];
list.push(4);
const numberVal = list.shift();
```

除了用 `[]` 的形式，也可以通过泛型（Generics）定义。

```typescript
let list: Array<number> = [1, 2, 3];
```

大部分情况建议使用 `[]` 的形式，遇到较复杂的类型时再考虑使用 `Array<elementType>` 的形式。

## Enum

对于一些事先确定范围的数据类型，我们一般会通过定义常量对象来描述。

```javascript
const NetworkType = {
    None: 0,
    Wifi: 1,
    Edge: 2,
    Unknown: 3,
};

let type = NetworkType.None;
```

按照上面这种写法，可以推导出变量 `type` 的类型其实是 `number`，但是并没有体现出 `NetworkType` 的取值范围。对于这种情况，TypeScript 给我们提供了枚举类型。

```typescript
enum NetworkType {
    None,
    Wifi,
    Edge,
    Unknown,
}

let type: NetworkType = NetworkType.Wifi;
```

通常情况下，枚举值会从 `0` 开始被依次赋值，当然我们也可以在定义时修改。

```typescript
enum NetworkType {
    None = 1,			// 1
    Wifi,			 		// 2
    Edge,				  // 3
    Unknown = 9,	// 9
}
```

也可以使用 `string` 类型定义枚举类型，此时每一个枚举值都必须赋初值。

```typescript
enum NetworkType {
    None = 'NONE',
    Wifi = 'WIFI',
    Edge = 'EDGE',
    Unknown = 'UNKNOWN',
}
```

可以通过枚举值获得枚举名。

```typescript
enum NetworkType {
    None,
    Wifi,
    Edge,
    Unknown,
}
const type = NetworkType.None;
const nameOfType = NetworkType[type]; // name === 'None'
```

是不是有点神奇？其实看一下编译成 JavaScript 的代码就很好理解了：

```javascript
var NetworkType;
(function (NetworkType) {
    NetworkType[NetworkType["None"] = 0] = "None";
    NetworkType[NetworkType["Wifi"] = 1] = "Wifi";
    NetworkType[NetworkType["Edge"] = 2] = "Edge";
    NetworkType[NetworkType["Unknown"] = 3] = "Unknown";
})(NetworkType || (NetworkType = {}));
var type = NetworkType.None;
var nameOfType = NetworkType[type]; // name === 'None'
```

不过很多场景下我们并不需要通过枚举值反推枚举名，或是担心在运行时枚举值被修改，这时候我们就可以使用 `const enum` 了。

```typescript
const enum NetworkType {
    None,
    Wifi,
    Edge,
    Unknown,
}
const type = NetworkType.None;
```

对应的编译后代码：

```js
var type = 0 /* None */;
```

简洁明了。

## Nullable

默认情况下 `null` 和 `undefined` 包含在其他类型内，例如：

```typescript
let numberVal: number; // numberVal is undefined
let stringVal: string = null;
```

大多数情况我们不会定义某个变量类型为 `null` 或 `undefined`，毕竟没有使用场景。不过在启用 TypeScript 的 `--strictNullChecks` 参数时， `null` 和 `undefined` 将从其他类型独立出来。

```typescript
let stringVal: string | null = null;
```

由 `|` 分隔的若干类型构成联合类型，例如 `string | null` 表示类型可以是 `string` 或 `null`。

## Any

假设有一个场景，需要解析用户配置，配置项以对象的形式提供，看起来好像很简单：

```typescript
let config: Object = getConfig();
console.log(config.name); // TS2339: Property 'name' does not exist on type 'Object'.
```

咦，怎么报错了？不是说好的配置项是个对象吗？其实这是很多人在编写 TypeScript 时会遇到的第一个误区。我们知道在 JavaScript 的世界所有对象都继承自 `Object`，TypeScript 也一样。对于一个 `Object` 类型的变量，我们可以给它赋任意值：

```typescript
let obj: Object;

obj = 1;
obj = 'Hello world!';
obj = false;
obj = function noop() {};
obj = [false, 1, '2'];
obj = {};
obj = null;
```

也正因此我们无法从 `Object` 类型推导出真正的类型，自然也就无法验证类型的合法性了。那这个方法应该怎么写？

```typescript
let config: any = getConfig();
console.log(config.name); // OK!
```

是的，TypeScript 有个厉害的类型叫 `any`。严格来说不应该把 `any` 归为类型，更多时候应该说是一个让 Typescript 忽略类型检查的标记。

## Object VS object

除了刚刚说到的 `Object` 类型，可能大家还会遇到 `object` 这个类型。初看之下好像两者没什么区别，但实际上两者属于两个不同的世界。

`Object` 来自 JavaScript，就是大家熟知的那个所有对象类型的根；`object` 是 TypeScript 的基本类型，用于指代除了基本类型之外的所有类型。

把刚才的例子改一下，看看会发生什么？

```typescript
let obj: object;

obj = 1; // Error
obj = 'Hello world!'; // Error
obj = false; // Error
obj = function noop() {};
obj = [false, 1, '2'];
obj = {};
obj = null; // Error when enable --strictNullChecks
```

---

# Interfaces

只有基础类型是肯定不够用的，而 `any` 虽然能用于各种复杂的类型，但我们都应该明白 `any` 不能用于类型检查，自然不是最好的选择。这里就要介绍一下 TypeScript 的接口（interface）了，这可是 TypeScript 的核心之一，主打定义类型和类型检查。

## 接口声明

声明和使用一个接口很简单，作为类型定义时，接口的使用方法与基础类型完全一样。

```typescript
interface Point {
    x: number;
    y: number;
}

let p: Point;
p = { x: 0 }; // TS2322: Type '{ x: number; }' is not assignable to type 'Point'.
p = { x: 0, z: 0 }; // TS2322: Type '{ x: number; z: number; }' is not assignable to type 'Point'.
p = { x: 0, y: 0 }; // OK!
```

## 可选属性

接口的属性值可以设置为可选。

```typescript
interface ColorizedPoint extends Point {
    color?: string;
}

let defaultPoint: ColorizedPoint = { x: 0, y: 0 };
defaultPoint.color = 'blue';
let redPoint: ColorizedPoint = { x: 0, y: 0, color: 'red' };
```

## 只读属性

接口的属性值可以设置为只读。

```typescript
interface FixedPoint extends Point {
    readonly x: number;
    readonly y: number;
}

let p: FixedPoint = { x: 0, y: 0 };
p.x = 1; // TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
```

## 接口继承

接口可以被继承，父类型可以接受子类型，但不意味着可以接受与子类型同构的数据。

```typescript
interface StereoPoint extends Point {
    z: number;
}

let point: Point;
let stereoPoint: StereoPoint = { x: 0, y: 0, z: 0 };
point = stereoPoint; // OK!
point = { x: 0, y: 0, z: 0 }; // TS2322: Type '{ x: number; y: number; z: number; }' is not assignable to type 'Point'.
```

## 索引属性

在某些场景，我们可能只关心数据结构中的特定属性，或是数据有统一的结构但属性名不可枚举，例如 HTTP 请求的响应头。

```typescript
interface ResponseHeaders {
    'accept'?: string;
    'set-cookie'?: string[];
    [header: string]: string | string[];
}
```

这里的 `[header: string]: string | string[] | undefined;` 定义了接口的索引属性，表示 `ResponseHeaders` 可以接受任意属性名为 `string` 类型、值为 `string | stirng[]` 类型的数据。

索引属性的属性名类型也支持 `number` 类型，例如：

```typescript
interface ArrayLike {
    length: number;
    [index: number]: any;
}

let array: ArrayLike = [0, 1, 2];
array[3] = 3;
```

---

# Functions

函数（function）是 JavaScript 应用程序的基础，TypeScript 为 JavaScript 的基础上为函数添加了许多额外的功能。

## 函数声明

函数的声明与 JavaScript 没有太大区别，给参数和函数加上 `: type` 声明即可。

```typescript
function filterData(list: string[]): string[] {
    return list.filter((val) => val.length > 5);
}

function log(...args: string[]): void {
    console.log(...filterData(args));
}
```

这里顺便提一下，`void` 也是 TypeScript 的基本类型，但基本都用来定义函数的返回值，就不在之前赘述了。

## 函数类型声明

这里稍稍有点绕，函数声明在 JavaScript 也有，但是函数类型的声明就是 TypeScript 独有的了，用来定义一系列函数的类型，包括参数数量和类型、返回值类型。

通过 `type` 声明

```typescript
type DataFilter = (value: string) => boolean;
```

通过 `interface` 声明

```typescript
interface DataFilter {
    (value: string): boolean;
}
```

声明了函数类型就可以开心地用了

```typescript
function filterData(list: string[], dataFilter: DataFilter): string[] {
    return list.filter(dataFilter);
}
```

不过很多时候函数类型声明并不是必须的，比如上面的例子，也可以直接写成

```typescript
function filterData(list: string[], dataFilter: (value: string) => boolean): string[] {
    return list.filter(dataFilter);
}
```

## 函数超载

先看一个例子：

```typescript
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
function padding(all: number, leftAndRight?: number, bottom?: number, left?: number) {
    if (leftAndRight === undefined && bottom === undefined && left === undefined) {
        leftAndRight = bottom = left = all;
    } else if (bottom === undefined && left === undefined) {
        bottom = all;
        left = leftAndRight;
    }

    return {
        top: all,
        right: leftAndRight,
        bottom: bottom,
        left: left
    };
}

padding(1); // { top: 1, right: 1, bottom: 1, left: 1 }
padding(1, 2); // { top: 1, right: 2, bottom: 1, left: 2 }
padding(1, 2, 1); // TS2575: No overload expects 3 arguments, but overloads do exist that expect either 2 or 4 arguments.
padding(1, 2, 1, 2); // { top: 1, right: 2, bottom: 1, left: 2 }
```

执行 `padding()` 函数时，传入不同的参数列表，不同位置上的参数所代表的含义也会发生变化。此时前三行函数声明只用于 TypeScript 的类型检查和推导，真正执行的还是第四行开始的代码。

## 工厂函数

某些情况下我们需要动态生成一些函数，完成一些特定的功能，比如下面这个例子：

```typescript
// 声明需要生成的函数类型
interface Validator {
    tester: RegExp;

    (value: string, index?: number): boolean;

    (values: string[]): boolean;
}

// 工厂函数
function createValidator(tester: RegExp): Validator {
    /**
     * `<Validator>` 用于把 `function` 类型转换成 `Validator` 类型；
     * `this: Validator` 用于指定函数运行时的上下文。
     */
    const validator = <Validator>function (this: Validator, value: string | string[], index?: number): boolean {
        if (typeof value === 'string') {
            return this.tester.test(value.slice(index));
        }

        return value.every((val) => this.tester.test(val));
    };

    validator.tester = tester;

    return validator.bind(validator);
}

const validate: Validator = createValidator(/\.fordeal\.com$/i);

validate('12345'); // false
validate('www.fordeal.com', 3); // true
validate(['www.fordeal.com', 'api.fordeal.com']); // true
validate(['www.fordeal.com', 'api.fordeal.com'], 3); // TS2345: Argument of type 'string[]' is not assignable to parameter of type 'string'.
```

*注：这里为了体现函数运行时的上下文，把 `tester` 挂到了 `Validator` 对象上，实际上通过闭包也可以实现一样的功能，在实际开发中请合理选择实现方法。*

# Classes

接触过 ES6 的同学肯定知道 JavaScript 的类（class），这可以说是面向对象编程的基石。TypeScript 里的类完全向 JavaScript 兼容，并添加了很多额外的功能。

## 类声明

拿之前的 `Point` 为例：

```typescript
class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
```

可以看到除了增加类型定义，和 ES6 的类声明基本一样。

## 类继承

和接口一样，类也可以被继承。

```typescript
class NamedPoint extends Point {
    name: string;

    constructor(x: number, y: number, name: string) {
        super(x, y);
        
        this.name = name;
    }
    
    toString(): string {
        return this.name + super.toString();
    }
}
```

在派生类中可以通过 `super` 关键字访问基类。

此外，接口同样可以继承类。

```typescript
interface FixedPoint extends Point {
    readonly x: number;
    readonly y: number;
}

let p0: Point = new Point(0, 0);
let p1: FixedPoint = p0;

p0.x += 10; // OK!
p1.x += 10; // TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
```

## 访问修饰符

访问修饰符（Access modifiers）包括：`public`、`private` 和 `protected`，默认均为 `public`。

```typescript
class A {
    public a: number = 0;
    protected b: number = 1;
    private c: number = 2;
}

class B extends A {
    getB(): number {
        return this.b; // OK!
    }
    
    getC(): number {
        return this.c; // Error!
    }
}

new A().a; // OK!
new A().b; // Error!
new A().c; // Error!
```

- `public` 在任意地方都可以访问；
- `private` 不能在声明它的类的外部访问；
- `protected` 与 `private` 比较类似，不过可以在类的派生类中访问。

## 只读修饰符

与接口的只读属性类似，类的属性也可以通过 `readonly` 修饰。

```typescript
class FixedPoint extends Point {
    readonly x: number;
    readonly y: number;
    readonly isReadonly: boolean = true;
    
    setX(x: number): void {
        this.x = x; // Error!
    }
}

new FixedPoint(0, 0).x = 1; // Error!
```

被 `readonly` 修饰的属性只能在定义属性或构造函数中被初始化。

## 参数属性

都说“懒惰是进步的源泉”，参数属性（Parameter property）就是一个很好的印证，还是以之前的 `Point` 为例：

```typescript
class Point {
    constructor(protected x: number, public y: number) {
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
```

这样的类声明和之前的写法等效，通过给构造函数的参数添加修饰符，把声明和赋值合并至一处。

```typescript
class A {
    constructor(protected a: number) {
    }
}

class B {
    constructor(private b: number) {
    }
}

class C {
    constructor(readonly c: number) {
    }
}

class D {
    constructor(private readonly d: number) {
    }
}
```

## 实现接口

接口可以继承自类，那类可以继承自接口吗？这是个好问题，不过在这之前我们先要分清两个概念：类型和实现。

类似 `type A = string | number` 和接口这些都属于类型，只作用在 TypeScript 的环境里，并不会对真实的 JavaScript 环境产生影响；而对于变量、函数或类这些定义都属于实现，是可以在 JavaScript 环境运行的逻辑。

现在再来看“类可以继承自接口吗”这个问题，显然是不可以的。类是实现，接口是类型，举个不太好的例子，有点像从虚无中产生物质（不要说是暗物质），自然不能实现。

但是！虽然类不能继承接口，但是我们可以实现（implement）接口。

```typescript
interface IStorage {
    readonly size: number;
    
    delete(key: string): boolean;

    get(key: string): any;

    has(key: string): boolean;

    set(key: string, value: any): void;
}

class PersistentStorage implements IStorage {
    get size(): number {
        /* Implement */
    }
    
    delete(key: string): boolean {
        /* Implement */
    }

    get(key: string): any {
        /* Implement */
    }

    has(key: string): boolean {
        /* Implement */
    }

    set(key: string, value: any): void {
        /* Implement */
    }
    
    protected save(): void {
        /* Implement */
    }
}

class MemoryStorage implements IStorage {
    get size(): number {
        /* Implement */
    }
    
    delete(key: string): boolean {
        /* Implement */
    }

    get(key: string): any {
        /* Implement */
    }

    has(key: string): boolean {
        /* Implement */
    }

    set(key: string, value: any): void {
        /* Implement */
    }
}
```

- 这种场景下，接口建议以 `I`（Interface）开头以与类做区分；
- 接口给类的实现提供了指导作用，类需要实现接口中定义的所有属性和方法；
- 接口只定义类的 `public` 部分，不需要也不能定义 `protected` 和 `private` 部分。

具体的使用场景在这里就不展开了，有兴趣的可以关注后续的分享。

## 抽象类

抽象类（Abstract class）介于接口和类之间，它可以被继承，但是无法实例化。

```typescript
abstract class Shape {
    abstract readonly perimeter: number;

    abstract calcArea(): number;

    toString(): string {
        return `Perimeter: ${this.perimeter}, area: ${this.calcArea()}`;
    }
}

class Square extends Shape {
    readonly perimeter: number;

    constructor(public readonly n: number) {
        super();

        this.perimeter = n * 4;
    }

    calcArea(): number {
        return this.n ** 2;
    }
}

class Circle extends Shape {
    constructor(public radius: number) {
        super();
    }

    get perimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    calcArea(): number {
        return Math.PI * (this.radius ** 2);
    }
}

new Shape().toString(); // TS2511: Cannot create an instance of an abstract class.
new Square(1).toString(); // 'Perimeter: 4, area: 1'
new Circle(1).toString(); // 'Perimeter: 6.283185307179586, area: 3.141592653589793'
```

在抽象类 `Shape` 中，`perimeter` 属性和 `calcArea()` 方法都被标记为 `abstract`，所以派生类在继承时必须都实现。`calcArea()` 方法很简单就不多说了，注意一下 `perimeter` 属性：

- 在 `Square` 类的构造函数中，边长 `n` 带有 `readonly` 修饰符，意味着 `perimeter` 也固定不变，所以可以直接通过 `n * 4` 赋值；
- 而 `Circle` 类的半径 `radius` 是可变的，意味着当 `radius` 改变时 `perimeter` 也应该随之变化，所以选择 getter 实现。

在复杂的项目开发中经常会遇到类似的情况，是选择属性还是通过 getter/setter 实现可以多斟酌下。

## 类方法超载

函数可以超载，类似的类方法也可以。

```typescript
interface IStyle {
    padding(all: number);

    padding(topAndBottom: number, leftAndRight: number);

    padding(top: number, right: number, bottom: number, left: number);
}

class Style implements IStyle {
    padding(all: number);
    padding(topAndBottom: number, leftAndRight: number);
    padding(top: number, right: number, bottom: number, left: number);
    padding(all: number, leftAndRight?: number, bottom?: number, left?: number) {
        if (leftAndRight === undefined && bottom === undefined && left === undefined) {
            leftAndRight = bottom = left = all;
        } else if (bottom === undefined && left === undefined) {
            bottom = all;
            left = leftAndRight;
        }

        return {
            top: all,
            right: leftAndRight,
            bottom: bottom,
            left: left
        };
    }
}

const style = new Style();

style.padding(1);
style.padding(1, 2);
style.padding(1, 2, 1);
style.padding(1, 2, 1, 2);
```

# Generics

泛型（generics）是在定义类型时非常常见，对于可复用的类型，泛型的引入使得同一份定义可以满足多样的数据类型，大大提高类型的灵活性。

## 泛型接口

先回忆一下之前我们定义的 `ArrayLike`

```typescript
interface ArrayLike {
    length: number;
    [index: number]: any;
}

let array: ArrayLike = [0, true, '2'];
let element = array[0];
```

通过 `ArrayLike` 我们可以简单的接受一个数组类型，但这样存在一个问题：无法描述数组元素的类型。例子里的 `element` 变量的类型只能推导出 `any`，同时在对 `array` 赋值时我们也没法限制数组元素的类型。

现在回忆一下如何定义一个数字类型的数组：`number[]` 或是 `Array<number>`。这里的 `Array<number>` 用的就是泛型。那么泛型怎么定义呢？

```typescript
interface ArrayLike<T> {
    length: number;
    [index: number]: T;
}

let numbers: ArrayLike<number> = [0, 1, 2];
let val: string = numbers[0]; // TS2322: Type 'number' is not assignable to type 'string'.
let strings: ArrayLike<string> = [0, 1, 2]; // TS2322: Type 'number[]' is not assignable to type 'ArrayLike<string>'.
```

通过 `<T1, T2, ...>` 传入若干**类型变量**，可以在后续定义中使用类型变量替代具体的类型。需要注意的是类型变量是一种特殊的变量，只用于表示类型而不是值。

## 范型函数

我们同样可以用泛型定义函数。

```typescript
function filterData<T>(list: T[], dataFilter: (value: T) => boolean): T[] {
    return list.filter(dataFilter);
}

let numbers: number[] = filterData([0, 1, 2, 3], (value) => value % 2 === 0);
let strings: string[] = filterData(['0', '11', '222', '333'], (value) => value.length % 2 === 0);
```

通过泛型我们的 `filterData()` 就可以处理各种不同类型的数据了。

## 范型类

范型类的定义和接口类似。

```typescript
class ValueHolder<T> {
    constructor(public value: T) {
    }

    toString(): string {
        return `I have a ${typeof this.value}`;
    }
}

new ValueHolder(0).toString(); // 'I have a number'
new ValueHolder('0').toString(); // 'I have a string'
```

## 泛型约束

有的时候我们的逻辑并不能支持所有类型，所以需要在定义泛型时约束可选的类型。

```typescript
function logShape<T extends Shape>(shape: T): void {
    console.log(shape.constructor.name, shape.perimeter, shape.calcArea());
}

logShape(new Square(1)); // Square 4 1
logShape(new Circle(1)); // Circle 6.283185307179586 3.141592653589793
logShape('Shape'); // TS2345: Argument of type '"Shape"' is not assignable to parameter of type 'Shape'.
```
