/* eslint-disable @typescript-eslint/no-unused-vars */
export type Optional<T> = Some<NonNullable<T>> | None<NonNullable<T>>;

/**
 * An Option is a container that may or may not contain a value.
 * It is designed to fit nicely with Object Oriented Programming.
 * @template T The type of the value contained in the Option
 * @example
 * const option = Option.of("foo");
 * if (option.isSome()) {
 *  console.log(option.get());
 * }
 * @example
 * const option = Option.of("foo");
 * option.map((value) => console.log(value));
 */
export abstract class Option<T extends NonNullable<unknown>> {
  protected value?: T;

  protected constructor(value?: T) {
    this.value = value;
  }

  /**
   * Creates a Some for a non null or undefined value.
   * @param value The value to create an Option from. Must not be null or undefined
   * @example
   * const option = Option.of("foo");
   * console.log(option.get());
   */

  public static some<U extends NonNullable<unknown>>(value: U): Some<U>;
  public static some<U>(value: NonNullable<U>): Optional<U> {
    return new Some(value);
  }

  /**
   * Creates a None for a null or undefined value.
   * @example
   * const option = Option.none();
   * console.log(option.isNone());
   */
  public static none<U extends NonNullable<unknown>>(): None<U> {
    return new None();
  }

  /**
   * Creates an Option from a value. If the value is null or undefined, a None will be returned.
   * @param value The value to create an Option from
   * @example
   * const option = Option.of("foo");
   * console.log(option.isSome());
   * @example
   * const option = Option.of(null);
   * console.log(option.isNone());
   */
  public static of<U>(value: U | undefined | null): Optional<U> {
    if (value === undefined || value === null) {
      return Option.none();
    }

    return Option.some(value);
  }

  /**
   * Creates an Option from a value. If the returned value is null, undefined or the function throws, a None will be returned.
   * @param value The value to create an Option from
   * @example
   * const option = Option.ofThrowable(() => "foo");
   * console.log(option.isSome());
   * @example
   * const option = Option.ofThrowable(() => null);
   * console.log(option.isNone());
   */
  public static ofThrowable<U>(throwable: () => U): Optional<U> {
    try {
      return Option.of(throwable());
    } catch {
      return Option.none();
    }
  }

  /**
   * Creates an Option from a value. If the return value is null, undefined or the promise rejects, a None will be returned.
   * @param value The value to create an Option from
   * @example
   * const option = await Option.ofThrowableAsync(async () => "foo");
   * console.log(option.get());
   * @example
   * const option = await Option.ofThrowableAsync(async () => null);
   * console.log(option.isNone());
   */
  public static async ofThrowableAsync<U>(throwable: () => Promise<U>): Promise<Optional<U>> {
    try {
      return Option.of(await throwable());
    } catch {
      return Option.none();
    }
  }

  /**
   * Verifies if the value is Some
   * @returns true if the value is Some, false otherwise
   * @example
   * const option = Option.of("foo");
   * console.log(option.isSome());
   * @example
   * const option = Option.none();
   * console.log(option.isSome());
   */
  public abstract isSome(): this is Some<T>;

  /**
   * Verifies if the value is None
   * @returns true if the value is None, false otherwise
   * @example
   * const option = Option.of("foo");
   * console.log(option.isNone());
   * @example
   * const option = Option.none();
   * console.log(option.isNone());
   */
  public abstract isNone(): this is None<T>;

  /**
   * Gets the value of the Option. If the value is None, an error will be thrown.
   * @param error The error to throw if the value is None. If this is a string, an Error will be thrown with the string as the message. If this is an Error, the error will be thrown
   * @throws If the value is None
   * @example
   * const option = Option.of("foo");
   * console.log(option.get());
   * @example
   * const option = Option.none();
   * console.log(option.get());
   */
  public abstract unwrap(error?: string | Error): T;

  /**
   * Gets the value of the Option. If the value is None, the defaultValue will be returned.
   * @param other lazy value to return if the value is None
   * @example
   * const option = Option.of("foo");
   * console.log(option.getOrElse("bar"));
   * @example
   * const option = Option.none();
   * console.log(option.getOrElse("bar"));
   */
  public abstract getOrElse(other: () => T): T;

  /**
   * Gets the value of the Option. If the value is None, the defaultValue will be returned.
   * @param other lazy value to return if the value is None
   * @example
   * const option = Option.of("foo");
   * console.log(await option.getOrElseAsync(async () => "bar"));
   * @example
   * const option = Option.none();
   * console.log(await option.getOrElseAsync(async () => "bar"));
   */
  public abstract getOrElseAsync(other: () => Promise<T>): Promise<T>;

  /**
   * Gets the option if it is Some. If the value is None, the other option will be returned.
   * @param value The lazy option to return if the value is None
   * @example
   * const option = Option.of("foo");
   * console.log(option.orElse(Option.of("bar")));
   * @example
   * const option = Option.none();
   * console.log(option.orElse(Option.of("bar")));
   */
  public abstract orElse(value: () => Optional<T>): Optional<T>;

  /**
   * Gets the option if it is Some. If the value is None, the other option will be returned.
   * @param value The lazy option to return if the value is None
   * @example
   * const option = Option.of("foo");
   * console.log(await option.orElseAsync(async () => Option.of("bar")));
   * @example
   * const option = Option.none();
   * console.log(await option.orElseAsync(async () => Option.of("bar")));
   */
  public abstract orElseAsync(value: () => Promise<Optional<T>>): Promise<Optional<T>>;

  /**
   * Verify if a predicate is satisfied by the value of the Option. If the value is None, false will be returned. This is often called "exists" in other languages.
   * @param predicate The predicate to verify
   * @example
   * const option = Option.of("foo");
   * console.log(option.satisfies((value) => value === "foo"));
   * @example
   * const option = Option.none();
   * console.log(option.satisfies((value) => value === "foo"));
   */
  public abstract satisfies(predicate: (value: T) => boolean): boolean;

  /**
   * Verify if a predicate is satisfied by the value of the Option. If the value is None, false will be returned. If the promise rejects, false will be returned.
   * @param predicate The predicate to verify
   * @example
   * const option = Option.of("foo");
   * console.log(await option.satisfiesAsync(async (value) => value === "foo"));
   * @example
   * const option = Option.none();
   * console.log(await option.satisfiesAsync(async (value) => value === "foo"));
   */
  public abstract satisfiesAsync(predicate: (value: T) => Promise<boolean>): Promise<boolean>;
  /**
   * Verify if a predicate is satisfied by the value of the Option. If the value is None, false will be returned.
   * @param predicate The predicate to verify
   * @example
   * const option = Option.of("foo");
   * console.log(await option.satisfiesAsync(async (value) => value === "foo"));
   * @example
   * const option = Option.none();
   * console.log(await option.satisfiesAsync(async (value) => value === "foo"));
   */

  /**
   * Maps the value of the Option to a new value. If the value is None, a None will be returned.
   * @param mapper The function to map the value to
   * @example
   * const option = Option.of("foo");
   * console.log(option.map((value) => value + "bar"));
   * @example
   * const option = Option.none();
   * console.log(option.map((value) => value + "bar"));
   */
  public abstract map<U>(mapper: (value: T) => U): Optional<U>;

  /**
   * Maps the value of the Option to a new value. If the value is None, a None will be returned. If the promise rejects, a None will be returned.
   * @param mapper The function to map the value to
   * @example
   * const option = Option.of("foo");
   * console.log(await option.mapAsync(async (value) => value + "bar"));
   * @example
   * const option = Option.none();
   * console.log(await option.mapAsync(async (value) => value + "bar"));
   */
  public abstract mapAsync<U>(mapper: (value: T) => Promise<U>): Promise<Optional<U>>;

  /**
   * Reduces the value of the Option to a single value. If the value is None, the initialValue will be returned.
   * @param initialValue The initial value to reduce the value with
   * @param reducer The function to reduce the value with
   * @example
   * const option = Option.of("foo");
   * console.log(option.reduce((acc, value) => acc + value, ""));
   * @example
   * const option = Option.none();
   * console.log(option.reduce((acc, value) => acc + value, ""));
   */
  public abstract reduce<U>(initialValue: U, reducer: (acc: U, value: T) => U): U;

  /**
   * Reduces the value of the Option to a single value. If the value is None, the initialValue will be returned. If the promise rejects, the initialValue will be returned.
   * @param initialValue The initial value to reduce the value with
   * @param reducer The function to reduce the value with
   * @example
   * const option = Option.of("foo");
   * console.log(await option.reduceAsync(async (acc, value) => acc + value, ""));
   * @example
   * const option = Option.none();
   * console.log(await option.reduceAsync(async (acc, value) => acc + value, ""));
   */
  public abstract reduceAsync<U>(initialValue: U, reducer: (acc: U, value: T) => Promise<U>): Promise<U>;

  /**
   * Folds the value of the Option to a single value. If the value is None, the none function will be called. If the value is Some, the some function will be called.
   * @param ifSome The function to call if the value is Some
   * @param ifNone The function to call if the value is None
   * @example
   * const option = Option.of("foo");
   * console.log(option.fold((value) => value + "bar", () => "baz"));
   * @example
   * const option = Option.none();
   * console.log(option.fold((value) => value + "bar", () => "baz"));
   */
  public abstract fold<U>(ifSome: (value: T) => U, ifNone: () => U): U;

  /**
   * Folds the value of the Option to a single value. If the value is None, the none function will be called. If the value is Some, the some function will be called.
   * @param ifSome The function to call if the value is Some
   * @param ifNone The function to call if the value is None
   * @example
   * const option = Option.of("foo");
   * console.log(await option.foldAsync(async (value) => value + "bar", () => "baz"));
   * @example
   * const option = Option.none();
   * console.log(await option.foldAsync(async (value) => value + "bar", () => "baz"));
   */
  public abstract foldAsync<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U>;

  /**
   * Filters the value of the Option. If the value is None, a None will be returned. If the predicate returns false, a None will be returned.
   * @param predicate The predicate to filter the value with
   * @example
   * const option = Option.of("foo");
   * console.log(option.filter((value) => value === "foo"));
   * @example
   * const option = Option.of("foo");
   * console.log(option.filter((value) => value === "bar"));
   * @example
   * const option = Option.none();
   * console.log(option.filter((value) => value === "foo"));
   */
  public abstract filter(predicate: (value: T) => boolean): Optional<T>;

  /**
   * Filters the value of the Option. If the value is None, a None will be returned. If the predicate returns false, a None will be returned.
   * @param predicate The predicate to filter the value with
   * @example
   * const option = Option.of("foo");
   * console.log(await option.filterAsync(async (value) => value === "foo"));
   * @example
   * const option = Option.of("foo");
   * console.log(await option.filterAsync(async (value) => value === "bar"));
   * @example
   * const option = Option.none();
   * console.log(await option.filterAsync(async (value) => value === "foo"));
   */
  public abstract filterAsync(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>>;

  /**
   * Flat maps the value of the Option. If the value is None, a None will be returned.
   * @param mapper The function to map the value to
   * @example
   * const option = Option.of("foo");
   * console.log(option.flatMap((value) => Option.of(value + "bar")));
   * @example
   * const option = Option.none();
   * console.log(option.flatMap((value) => Option.of(value + "bar")));
   */
  public abstract flatMap<U extends Optional<unknown>>(mapper: (value: T) => U): U;

  /**
   * Flat maps the value of the Option. If the value is None, a None will be returned.
   * @param mapper The function to map the value to
   * @example
   * const option = Option.of("foo");
   * console.log(await option.flatMapAsync(async (value) => Option.of(value + "bar")));
   * @example
   * const option = Option.none();
   * console.log(await option.flatMapAsync(async (value) => Option.of(value + "bar")));
   */
  public abstract flatMapAsync<U extends Optional<unknown>>(mapper: (value: T) => Promise<U>): Promise<U>;

  /**
   *
   * @deprecated since 2.1.0. Use `fold` instead
   * @param ifSome Function to execute if option isSome.
   * @param ifNone Function to execute if option isNone.
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public abstract match<U>(ifSome: (value: T) => U, ifNone: () => U): U;

  /**
   * @deprecated since 2.1.0. Use `foldAsync` instead
   * @param ifSome Function to execute if option isSome.
   * @param ifNone Function to execute if option isNone.
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public abstract matchAsync<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U>;

  /**
   * Converts the Option to a nullable value. If the value is None, null will be returned.
   * @example
   * const option = Option.of("foo");
   * console.log(option.toNullable());
   * @example
   * const option = Option.none();
   * console.log(option.toNullable());
   * @returns The value of the Option if it is Some, otherwise null
   */
  public abstract toNullable(): T | null;

  /**
   * Converts the Option to an undefined value. If the value is None, undefined will be returned.
   * @example
   * const option = Option.of("foo");
   * console.log(option.toUndefined());
   * @example
   * const option = Option.none();
   * console.log(option.toUndefined());
   * @returns The value of the Option if it is Some, otherwise undefined
   */
  public abstract toUndefined(): T | undefined;

  /**
   * Checks if the Option value is equal to another Optional.
   * If the comparator is provided, it will be used to compare the values. However, if the other Optional is None, false will be returned.
   * @param other The Optional to compare to
   * @param comparator The comparator to use to compare the values. If this is not provided, the values will be compared using ===
   *
   * @returns true if the values are equal, false otherwise
   */
  public abstract equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean): boolean;

  /**
   * Checks if the Option value is equal to another Optional.
   * If the comparator is provided, it will be used to compare the values. However, if the other Optional is None, false will be returned.
   * @param other The Optional to compare to
   * @param comparator The comparator to use to compare the values. If this is not provided, the values will be compared using ===
   * @returns true if the values are equal, false otherwise
   */
  public abstract equalsAsync(other: Optional<T>, comparator?: (a: T, b: T) => Promise<boolean>): Promise<boolean>;
}

class Some<T extends NonNullable<unknown>> extends Option<T> {
  public get(): T {
    return this.value!;
  }

  public isNone(): this is None<T> {
    return false;
  }

  public isSome(): this is Some<T> {
    return true;
  }

  public unwrap(error?: string | Error): T {
    return this.get();
  }

  public getOrElse(other: () => T): T {
    return this.get();
  }

  public async getOrElseAsync(other: () => Promise<T>): Promise<T> {
    return this.get();
  }

  public orElse(other: () => Optional<T>): Optional<T> {
    return this;
  }

  public async orElseAsync(other: () => Promise<Optional<T>>): Promise<Optional<T>> {
    return this;
  }

  public satisfies(predicate: (value: T) => boolean): boolean {
    return predicate(this.get());
  }

  public async satisfiesAsync(predicate: (value: T) => Promise<boolean>): Promise<boolean> {
    return await predicate(this.get());
  }

  public map<U>(mapper: (value: T) => NonNullable<U>): Some<NonNullable<U>>;
  public map<U>(mapper: (value: T) => U): Optional<U>;
  public map<U>(mapper: (value: T) => NonNullable<U> | U): Optional<U> {
    return Option.of(mapper(this.get()));
  }

  public async mapAsync<U>(mapper: (value: T) => Promise<NonNullable<U>>): Promise<Some<NonNullable<U>>>;
  public async mapAsync<U>(mapper: (value: T) => Promise<U>): Promise<Optional<U>>;
  public async mapAsync<U>(mapper: (value: T) => NonNullable<U> | U): Promise<Optional<U>> {
    return Option.of(await mapper(this.get()));
  }

  public filter(predicate: (value: T) => boolean): Optional<T> {
    if (predicate(this.get())) {
      return this;
    }

    return Option.none();
  }

  public async filterAsync(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>> {
    if (await predicate(this.get())) {
      return this;
    }

    return Option.none();
  }

  public reduce<U>(initialValue: U, reducer: (acc: U, value: T) => U): U {
    return reducer(initialValue, this.get());
  }

  public async reduceAsync<U>(initialValue: U, reducer: (acc: U, value: T) => Promise<U>): Promise<U> {
    return await reducer(initialValue, this.get());
  }

  public equals(other: Optional<T>, comparator: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
    if (other.isNone()) {
      return false;
    }

    return comparator(this.get(), other.get());
  }

  public fold<U>(ifSome: (value: T) => U, ifNone: () => U): U {
    return ifSome(this.get());
  }

  public async foldAsync<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U> {
    return await ifSome(this.get());
  }

  public async equalsAsync(
    other: Optional<T>,
    comparator: (a: T, b: T) => Promise<boolean> = async (a, b) => a === b
  ): Promise<boolean> {
    if (other.isNone()) {
      return false;
    }

    return await comparator(this.get(), other.get());
  }

  public flatMap<U extends Optional<unknown>>(mapper: (value: T) => U): U {
    return mapper(this.get());
  }

  public async flatMapAsync<U extends Optional<unknown>>(mapper: (value: T) => Promise<U>): Promise<U> {
    return await mapper(this.get());
  }

  /**
   *
   * @deprecated since 2.1.0. Use `fold` instead
   * @param ifSome Function to execute if option isSome.
   * @param ifNone Function to execute if option isNone.
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public match<U>(ifSome: (value: T) => U, ifNone: () => U): U {
    return this.fold(ifSome, ifNone);
  }

  /**
   *
   * @deprecated since 2.1.0. Use `foldAsync` instead
   * @param ifSome Function to execute if option isSome.
   * @param ifNone Function to execute if option isNone.
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public async matchAsync<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U> {
    return this.foldAsync(ifSome, ifNone);
  }

  public toNullable(): T {
    return this.get();
  }

  public toUndefined(): T {
    return this.get();
  }
}

class None<T extends NonNullable<unknown>> extends Option<T> {
  public isNone(): this is None<T> {
    return true;
  }

  public isSome(): this is Some<T> {
    return false;
  }

  public unwrap(error: string | Error = "No value in Option"): T {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }

  public getOrElse(other: () => T): T {
    return other();
  }

  public async getOrElseAsync(other: () => Promise<T>): Promise<T> {
    return await other();
  }

  public orElse(other: () => Optional<T>): Optional<T> {
    return other();
  }

  public async orElseAsync(other: () => Promise<Optional<T>>): Promise<Optional<T>> {
    return await other();
  }

  public satisfies(predicate: (value: T) => boolean): boolean {
    return false;
  }

  public async satisfiesAsync(predicate: (value: T) => Promise<boolean>): Promise<boolean> {
    return false;
  }

  public map<U>(mapper: (value: T) => U): None<NonNullable<U>> {
    return this as unknown as None<NonNullable<U>>;
  }

  public async mapAsync<U>(mapper: (value: T) => Promise<U>): Promise<None<NonNullable<U>>> {
    return this as unknown as None<NonNullable<U>>;
  }

  public filter(predicate: (value: T) => boolean): None<T> {
    return this as unknown as None<T>;
  }

  public async filterAsync(predicate: (value: T) => Promise<boolean>): Promise<None<T>> {
    return this as unknown as None<T>;
  }

  public reduce<U>(initialValue: U, reducer: (acc: U, value: T) => U): U {
    return initialValue;
  }

  public async reduceAsync<U>(initialValue: U, reducer: (acc: U, value: T) => Promise<U>): Promise<U> {
    return initialValue;
  }

  public fold<U>(ifSome: (value: T) => U, ifNone: () => U): U {
    return ifNone();
  }

  public async foldAsync<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U> {
    return await ifNone();
  }

  public equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean): boolean {
    return other.isNone();
  }

  public async equalsAsync(other: Optional<T>, comparator?: (a: T, b: T) => Promise<boolean>): Promise<boolean> {
    return other.isNone();
  }

  public flatMap<U extends Optional<unknown>>(mapper: (value: T) => U): U {
    return this as unknown as U;
  }

  public async flatMapAsync<U extends Optional<unknown>>(mapper: (value: T) => Promise<U>): Promise<U> {
    return this as unknown as U;
  }

  /**
   *
   * @deprecated since 2.1.0. Use `fold` instead
   * @param ifSome Function to execute if option isSome.
   * @param ifNone Function to execute if option isNone.
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public match<U>(ifSome: (value: T) => U, ifNone: () => U): U {
    return this.fold(ifSome, ifNone);
  }

  /**
   *
   * @deprecated since 2.1.0. Use `foldAsync` instead
   * @param ifSome Function to execute if option isSome.
   * @param ifNone Function to execute if option isNone.
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public async matchAsync<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U> {
    return this.foldAsync(ifSome, ifNone);
  }

  public toNullable(): null {
    return null;
  }

  public toUndefined(): undefined {
    return undefined;
  }
}
