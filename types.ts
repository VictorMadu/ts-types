export type Func<R extends any = any, A extends any[] = any[]> = (...args: A) => R;
export type VoidFunc<T extends any[] = any[]> = Func<void, T>;

export type IsSubType<T extends any, U extends any> = T extends U ? T : never;

export type IsEqualType<T extends any, U extends any> = IsSubType<T, U> extends never ? never: IsSubType<U, T> extends never ? never: T;

// https://stackoverflow.com/questions/60872063/enforce-typescript-object-has-exactly-one-key-from-a-set
export type ExactlyOneKey<K extends keyof any, V, KK extends keyof any = K> = {
    [P in K]: 
        { [Q in P]: V } & { [Q in Exclude<KK, P>]?: undefined } extends infer O ? 
            { [Q in keyof O]: O[Q] } : never;
}[K];

export type ExactlyAllKey<K extends keyof any, V> = {
    [P in K]: V;
};


export type AtLeastOne<T extends Record<string | symbol | number, any>> = {
    [K in keyof T]: 
        {[Q in K]: T[Q]} & {[Q in Exclude<keyof T, K>]?: T[Q]} extends infer O ? 
            {[Q in keyof O]: O[Q]} : never;
}[keyof T]


export type ExactlyOne<T extends Record<string | symbol | number, any>> =  {
  [K in keyof T]: {
    [Q in K]: T[Q]
  }
}[keyof T]

export type OrWithPromise<K extends any> = K | Promise<K>;

export type OrWithArray<T> = T | T[]

export type ExcludeFromTuple<T extends any[],  U extends any, V extends any[] = []> = T extends [
  infer O,
  ...(infer P)
]
  ? ExcludeFromTuple<P, U, [...V, Exclude<O, U>]>
  : V;


export type Keys<T extends Record< string | symbol | number, any>> = {
  [K in keyof T]: K
}[keyof T]


// TODO: Look into this
export type StrKeys<T extends Record< string | symbol | number, any>> = {
  [K in keyof T]: K extends string | number  ? `${K}` : never
}[keyof T]

// export type StrKeys<T extends Record< string | symbol | number, any>> = Extract<Keys<T>, string>

export type Values<T extends Record< string | symbol | number, any>> = {
  [K in keyof T]: T[K]
}[keyof T]


export type IsInKeys<K extends string | symbol | number, R extends Record< string | symbol | number, any>> = K extends Keys<R> ? K : never;

export type IsInValues<V extends string | symbol | number, R extends Record< string | symbol | number, any>> = V extends Values<R> ? V : never;

export type ExcludeKey<
  T extends Record< string | symbol | number, any>,
  U extends keyof T
> = {
  [Q in Exclude<keyof T, U>]: T[Q];
};

export type ExtractKeys<T extends Record< string | symbol | number, any>, U extends string | symbol | number | keyof T> = Extract<Keys<T>, U>;

export type PropListener<T extends Record< string | symbol | number, any>> = {[K in ExtractKeys<T, string> as `on${Capitalize<K>}`]? : (...args: any[]) => void}

export type FuncParams<T extends (...args: any[]) => any> = T extends (... args: infer O) => any ? O : never;

export type FuncReturn<T extends (...args: any[]) => any> = T extends (... args: any[]) => infer O ? O : never;

export type ArrayType<T> = T extends [...args: infer O] ? O[number] : never;

export type FuncType<T extends Func> = Func<FuncParams<T>,ReturnType<T>>

export type WithPromiseReturn<T extends Func> = Func< Promise<ReturnType<T>>, FuncParams<T>>

export type PromiseReturnType<T> = T extends Func<Promise<infer O>, any[]> ? O : never; 

export type ConstructorParamsType<T extends abstract new (...args: any[]) => any> = T extends abstract new (...args: infer O) => any ? O : never

export type ConstructorReturnType<T extends abstract new (...args: any[]) => any> = T extends abstract new (...args: any[]) => infer O ? O : never;

export type Constructor<R extends any = any, T extends any[] = any[]> = {
    new (...args: T): R;
  };

  export type Methods<T extends Record<string | symbol | number, any>> = {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T];


// Inspired by:  https://stackoverflow.com/questions/21224922/is-there-a-way-to-represent-a-non-negative-integer-in-typescript-so-that-the-com

export type Integer<T extends number> = `${T}` extends `${number}.${number}` ? never : T;

export type PosInteger<T extends number> =  Integer<T> extends never ? never : `${T}` extends `-${number}` ? never : T;

export type NegInteger<T extends number> =  Integer<T> extends never ? never : PosInteger<T> extends never ? T : never;

export type Float<T extends number> = Integer<T> extends never ? T : never;

export type PosFloat<T extends number> = Float<T> extends never ? never : `${T}` extends `-${number}.${number}` ? never : T;

export type NegFloat<T extends number> =  Float<T> extends never ? never : PosFloat<T> extends never ? T : never;

export type Prop<T extends Record<string | symbol | number, any>, S extends unknown> = S extends Keys<T> | StrKeys<T> ? T[S] : undefined;


type _InnerValueForStrKeys<T extends Record<string | number, any> | any, S extends string> = 
  S  extends `${infer O}.${infer P}` ?  
    T extends Record<string, any> ? 
      _InnerValueForStrKeys<T[O], P> 
      :
      undefined 
    :
    T extends Record<string, any> ?
      Prop<T, S>
      :
      undefined

export type InnerValue<T extends Record<string | symbol | number, any>, S extends unknown> = 
  S extends string ?
    T extends Record<string | number, any> ?
      _InnerValueForStrKeys<T, S>
      :
      undefined 
    :
    Prop<T, S>
        
   
 type _InnerKeys<T extends Record<string | number | symbol, any>,   IK extends string = ''> = 
    {
    [K in StrKeys<T>]: 
      T[K] extends Record<string, any> ? 
        T[K] extends Array<any> ?
          IK | CombineWithAncestors<K, IK> :
          _InnerKeys<T[K], Exclude<IK, ''> | CombineWithAncestors<K, IK>> 
        : 
        IK | CombineWithAncestors<K, IK>
    }[StrKeys<T>]

type CombineWithAncestors<C extends string, A extends string> = A extends '' ? C : `${A}.${C}`

export type InnerKeys<T extends Record<string | number | symbol, any>> =  
  Keys<T> |  Exclude<_InnerKeys<T, ''>, ''> extends infer O ? O : never;

