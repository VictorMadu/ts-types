import * as types from "./types";

type Arr = string[];
type Tuple = [string, number, { foo: "bar" }];
type Fn = (foo: string, bar: { one: number; two: Symbol[] }) => string;
type Obj = {
  1: "one";
  3: "three";
  "2": "two";
  ok: "string";
  f: "ff";
  foo: "bar";
};

type IAnyFn = types.Func;

type IFn = types.Func<string, [string, string, number]>;

type IAnyVoidFn = types.VoidFunc;

type IVoidFn = types.VoidFunc<[string, string, number]>;

type IsSubType1 = types.IsSubType<"d", string>;
type IsSubType2 = types.IsSubType<"d" | 1, string>;
type IsSubType3 = types.IsSubType<string, "d">;
type IsSubType4 = types.IsSubType<string, number>;
type IsSubType5 = types.IsSubType<Obj, { 1: "one" }>;
type IsSubType6 = types.IsSubType<{ 1: "one" }, Obj>;
type IsSubType7 = types.IsSubType<["foo", "bar"], Arr>;
type IsSubType8 = types.IsSubType<["d", 6, { foo: "bar" }], Tuple>;

type IsEqualType1 = types.IsEqualType<"d", string>;
type IsEqualType2 = types.IsEqualType<"d", "d">;

type IExactlyOneKey = types.ExactlyOneKey<"a" | "b" | "c", string>;

type IExactlyAllKey = types.ExactlyAllKey<"a" | "b" | "c", string>;

type IAtLeastOne = types.AtLeastOne<Obj>;

type IExactylyOne = types.ExactlyOne<Obj>;

type IAndWithPromise = types.AndWithPromise<Obj>;

type IAndWithArray = types.AndWithArray<string | number>;

//  ===================== ExcludeFromTuple ================================
type arr = [
  string,
  number | null,
  string | undefined,
  number,
  string | undefined | null
];

type ExcludeFromTuple1 = types.ExcludeFromTuple<arr, null>;
type ExcludeFromTuple2 = types.ExcludeFromTuple<arr, undefined>;
type ExcludeFromTuple3 = types.ExcludeFromTuple<arr, string>;
type ExcludeFromTuple4 = types.ExcludeFromTuple<arr, number>;
type ExcludeFromTuple5 = types.ExcludeFromTuple<arr, string | number>;

type IExcludeKey = types.ExcludeKey<Obj, "ok">;

type IKeys = types.Keys<Obj>;

type IsInKeys = types.IsInKeys<1, Obj>;
type IsNotInKeys = types.IsInKeys<"3", Obj>;

type IStrKeys = types.StrKeys<Obj>;

type IValues = types.Values<Obj>;
type IsInValues = types.IsInValues<"two", Obj>;
type IsNotInValues = types.IsInValues<"foo", Obj>;

type IExtractKeys = types.ExtractKeys<Obj, string>;

type IExtractKeys2 = types.ExtractKeys<Obj, "f">;

type IPropListener = types.PropListener<Obj>;

type IFuncParams = types.FuncParams<Fn>;

type IFuncReturn = types.FuncReturn<Fn>;

type IArrType = types.ArrayType<Arr>;

type ITupleType = types.ArrayType<Tuple>;

const fn = (foo: string, bar: number) => {
  return "fn";
};

type IFuncType = types.FuncType<typeof fn>; // same as just `typeof fn`

type IWithPromiseReturn = types.WithPromiseReturn<typeof fn>;
type IWithPromiseReturn1 = types.WithPromiseReturn<Fn>;
type IWithPromiseReturn2 = types.WithPromiseReturn<types.Func>;
type IWithPromiseReturn3 = types.WithPromiseReturn<
  types.Func<types.FuncReturn<typeof fn>, types.FuncParams<typeof fn>>
>;

const sym = Symbol();
class Foo {
  constructor(foo1: string, foo2: number) {}

  fooMethod() {
    return "fooMethod return";
  }

  barMethod() {
    return "barMethod return";
  }

  [sym]() {
    return "symbol return";
  }
}

const FooClass = class {
  constructor(foo1: string, foo2: number) {}
};

type IConstructorParamsType = types.ConstructorParamsType<typeof FooClass>;

type IConstructorReturnType = types.ConstructorReturnType<typeof FooClass>;

const fooClass1: FooClass = new FooClass("f", 1); // error
const fooClass2: IConstructorReturnType = new FooClass("f", 1); // ok

type IConstructor = types.Constructor;
type IConstructor1 = types.Constructor<Foo, [string, number]>;
type IConstructor2 = types.Constructor<
  IConstructorReturnType,
  IConstructorParamsType
>;

type IClassMethod = types.Methods<Foo>;

const classMethod1: IClassMethod = Symbol();
const classMethod2: IClassMethod = sym;
const classMethod3: IClassMethod = "barMethod";

type IPromiseReturnType1 = types.PromiseReturnType<types.Func>;
type IPromiseReturnType2 = types.PromiseReturnType<
  types.WithPromiseReturn<types.Func>
>;

// Example inspired by: https://stackoverflow.com/questions/21224922/is-there-a-way-to-represent-a-non-negative-integer-in-typescript-so-that-the-com

type Integer1 = types.Integer<3>;
type Integer2 = types.Integer<3.1>;
type Integer3 = types.Integer<-3>;
type Integer4 = types.Integer<-3.1>;

function negate1<N extends number>(n: types.Integer<N>): number {
  return -n;
}
negate1(3); // ok
negate1(3.1); // error
negate1(-3); // ok
negate1(-3.1); // error

type PosInteger1 = types.PosInteger<3>;
type PosInteger2 = types.PosInteger<3.1>;
type PosInteger3 = types.PosInteger<-3>;
type PosInteger4 = types.PosInteger<-3.1>;

function negate2<N extends number>(n: types.PosInteger<N>): number {
  return -n;
}
negate2(3); // ok
negate2(3.1); // error
negate2(-3); // error
negate2(-3.1); // error

type NegInteger1 = types.NegInteger<3>;
type NegInteger2 = types.NegInteger<3.1>;
type NegInteger3 = types.NegInteger<-3>;
type NegInteger4 = types.NegInteger<-3.1>;

function negate3<N extends number>(n: types.NegInteger<N>): number {
  return -n;
}
negate3(3); // error
negate3(3.1); // error
negate3(-3); // ok
negate3(-3.1); // error

type Float1 = types.Float<3>;
type Float2 = types.Float<3.1>;
type Float3 = types.Float<-3>;
type Float4 = types.Float<-3.1>;

function negate4<N extends number>(n: types.Float<N>): number {
  return -n;
}
negate4(3); // error
negate4(3.1); // ok
negate4(-3); // error
negate4(-3.1); // ok

type PosFloat1 = types.PosFloat<3>;
type PosFloat2 = types.PosFloat<3.1>;
type PosFloat3 = types.PosFloat<-3>;
type PosFloat4 = types.PosFloat<-3.1>;

function negate5<N extends number>(n: types.PosFloat<N>): number {
  return -n;
}
negate5(3); // error
negate5(3.1); // ok
negate5(-3); // error
negate5(-3.1); // error

type NegFloat1 = types.NegFloat<3>;
type NegFloat2 = types.NegFloat<3.1>;
type NegFloat3 = types.NegFloat<-3>;
type NegFloat4 = types.NegFloat<-3.1>;

function negate6<N extends number>(n: types.NegFloat<N>): number {
  return -n;
}
negate6(3); // error
negate6(3.1); // error
negate6(-3); // error
negate6(-3.1); // ok

const sym4 = Symbol();
type Obj2 = {
  dd: { gg: { hh: { hh: "ddef" } } };
  2: "two";
  [sym4]: "sym4";
  "3"?: string | undefined;
};

type Prop1 = types.Prop<Obj2, 2>;
type Prop2 = types.Prop<Obj2, "3">;

type InnerValue1 = types.InnerValue<Obj2, "dd.gg.hh.hh">;
type InnerValue2 = types.InnerValue<Obj2, "dd.gg.hh">;
type InnerValue3 = types.InnerValue<Obj2, "dd.gg">;
type InnerValue4 = types.InnerValue<Obj2, "dd">;
type InnerValue5 = types.InnerValue<Obj2, "">;
type InnerValue6 = types.InnerValue<Obj2, "ff">;
type InnerValue7 = types.InnerValue<Obj2, "2">;
type InnerValue8 = types.InnerValue<Obj2, 2>;
type InnerValue9 = types.InnerValue<Obj2, typeof sym4>;

type InnerKeys1 = types.InnerKeys<Obj>;
type InnerKeys2 = types.InnerKeys<Obj2>;

interface Config {
  app: {
    address: string;
    port: number;
  };
}

type InnerKeys3 = types.InnerKeys<Config>;

// TODO: Replace all T, S with meaningful names
