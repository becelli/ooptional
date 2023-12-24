/* eslint-disable @typescript-eslint/no-unused-vars */
export type Optional<T> = Some<NonNullable<T>> | None<NonNullable<T>>;

/**
 * An Option is a container that may or may not contain a value.
 * It is designed to fit nicely with Object Oriented Programming.
 * @template T The type of the value contained in the Option
 * @example
 * const option = Option.ofNullable("foo");
 * if (option.isSome()) {
 *  console.log(option.get());
 * }
 * @example
 * const option = Option.ofNullable("foo");
 * option.map((value) => console.log(value));
 */
export abstract class Option<T extends NonNullable<unknown>> {
  protected value?: NonNullable<T>;

  protected constructor(value?: T) {
    this.value = value;
  }

  /**
   * Creates a Some for a non null or undefined value.
   * @param value The value to create an Option from. Must not be null or undefined
   * @throws If value is null or undefined
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.get());
   */
  public static some<T>(value: NonNullable<T>): Some<NonNullable<T>> {
    if (value === undefined || value === null) {
      throw new Error("Value must not be null or undefined");
    }
    return new Some(value);
  }

  /**
   * Creates a None for a null or undefined value.
   * @example
   * const option = Option.none();
   * console.log(option.isNone());
   */
  public static none<T>(): None<NonNullable<T>> {
    return new None();
  }

  /**
   * Creates an Option from a value. If the value is null or undefined, a None will be returned.
   * @param value The value to create an Option from
   * @example
   * const option = Option.ofNullableNullable("foo");
   * console.log(option.isSome());
   * @example
   * const option = Option.ofNullableNullable(null);
   * console.log(option.isNone());
   */
  public static ofNullable<T>(value: T | undefined | null): Optional<NonNullable<T>> {
    if (value === undefined || value === null) {
      return Option.none();
    }

    return Option.some(value);
  }

  /**
   * Creates an Option from a value. If the returned value is null, undefined or the function throws, a None will be returned.
   * @param value The value to create an Option from
   * @example
   * const option = Option.ofNullableNullable("foo");
   * console.log(option.isSome());
   * @example
   * const option = Option.ofNullableNullable(null);
   * console.log(option.isNone());
   */
  public static ofThrowable<T>(throwable: () => T): Optional<T> {
    try {
      return Option.ofNullableNullable(throwable());
    } catch {
      return Option.none();
    }
  }

  /**
   * Creates an Option from a value. If the return value is null, undefined or the promise rejects, a None will be returned.
   * @param value The value to create an Option from
   * @example
   * const option = Option.ofNullableNullable(async () => "foo");
   * console.log(option.get());
   * @example
   * const option = Option.ofNullableNullable(async () => null);
   * console.log(option.isNone());
   */
  public static async ofThrowableAsync<T>(throwable: () => Promise<T>): Promise<Optional<T>> {
    try {
      return Option.ofNullableNullable(await throwable());
    } catch {
      return Option.none();
    }
  }

  /**
   * Verifies if the value is Some
   * @returns true if the value is Some, false otherwise
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.isSome());
   * @example
   * const option = Option.none();
   * console.log(option.isSome());
   */
  public abstract isSome(): this is Some<NonNullable<T>>;

  /**
   * Verifies if the value is None
   * @returns true if the value is None, false otherwise
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.isNone());
   * @example
   * const option = Option.none();
   * console.log(option.isNone());
   */
  public abstract isNone(): this is None<NonNullable<T>>;

  /**
   * Gets the value of the Option. If the value is None, an error will be thrown.
   * @param error The error to throw if the value is None. If this is a string, an Error will be thrown with the string as the message. If this is an Error, the error will be thrown
   * @throws If the value is None
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.get());
   * @example
   * const option = Option.none();
   * console.log(option.get());
   */
  public abstract unwrap(error?: string | Error): T;

  /**
   * Gets the value of the Option. If the value is None, the defaultValue will be returned.
   * @param defaultValue The value to return if the value is None
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.getOrElse("bar"));
   * @example
   * const option = Option.none();
   * console.log(option.getOrElse("bar"));
   */
  public abstract getOrElse(defaultValue: T): NonNullable<T>;

  /**
   * Gets the option if it is Some. If the value is None, the other option will be returned.
   * @param value The option to return if the value is None
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.orElse(Option.ofNullable("bar")));
   * @example
   * const option = Option.none();
   * console.log(option.orElse(Option.ofNullable("bar")));
   */
  public abstract orElse(value: Optional<T>): Optional<T>;

  /**
   * Maps the value of the Option to a new value. If the value is None, a None will be returned. If the function throws, a None will be returned.
   * @param f The function to map the value to
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.map((value) => value + "bar"));
   * @example
   * const option = Option.none();
   * console.log(option.map((value) => value + "bar"));
   */
  public abstract map<U>(f: (value: T) => U): Optional<U>;

  /**
   * Maps the value of the Option to a new value. If the value is None, a None will be returned. If the promise rejects, a None will be returned.
   * @param f The function to map the value to
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(await option.mapAsync(async (value) => value + "bar"));
   * @example
   * const option = Option.none();
   * console.log(await option.mapAsync(async (value) => value + "bar"));
   */
  public abstract mapAsync<U>(f: (value: T) => Promise<U>): Promise<Optional<U>>;

  /**
   * Filters the value of the Option. If the value is None, a None will be returned. If the predicate returns false, a None will be returned.
   * @param predicate The predicate to filter the value with
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.filter((value) => value === "foo"));
   * @example
   * const option = Option.ofNullable("foo");
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
   * const option = Option.ofNullable("foo");
   * console.log(await option.filterAsync(async (value) => value === "foo"));
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(await option.filterAsync(async (value) => value === "bar"));
   * @example
   * const option = Option.none();
   * console.log(await option.filterAsync(async (value) => value === "foo"));
   */
  public abstract filterAsync(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>>;

  /**
   * Flat maps the value of the Option. If the value is None, a None will be returned. If the function throws, a None will be returned.
   * @param f The function to map the value to
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(option.flatMap((value) => Option.ofNullable(value + "bar")));
   * @example
   * const option = Option.none();
   * console.log(option.flatMap((value) => Option.ofNullable(value + "bar")));
   */
  public abstract flatMap<U>(f: (value: T) => Optional<U>): Optional<U>;

  /**
   * Flat maps the value of the Option. If the value is None, a None will be returned. If the promise rejects, a None will be returned.
   * @param f The function to map the value to
   * @example
   * const option = Option.ofNullable("foo");
   * console.log(await option.flatMapAsync(async (value) => Option.ofNullable(value + "bar")));
   * @example
   * const option = Option.none();
   * console.log(await option.flatMapAsync(async (value) => Option.ofNullable(value + "bar")));
   */
  public abstract flatMapAsync<U>(f: (value: T) => Promise<Optional<U>>): Promise<Optional<U>>;

  /**
   *
   * @param some Function to execute if option isSome. If this function throws, the result of none will be returned
   * @param none Function to execute if option isNone. If this function throws, the error WILL NOT be caught
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public abstract match<U>(some: (value: T) => U, none: () => U): U;

  /**
   *
   * @param some Function to execute if option isSome. If this function throws, the result of none will be returned
   * @param none Function to execute if option isNone. If this function throws, the error WILL NOT be caught
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public abstract matchAsync<U>(some: (value: T) => Promise<U>, none: () => Promise<U>): Promise<U>;

  /**
   * Converts the Option to a nullable value. If the value is None, null will be returned.
   * @example
   * const option = Option.ofNullable("foo");
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
   * const option = Option.ofNullable("foo");
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
}

class Some<T extends NonNullable<unknown>> extends Option<T> {
  public get(): T {
    return this.value!;
  }

  public isNone(): this is None<NonNullable<T>> {
    return false;
  }

  public isSome(): this is Some<NonNullable<T>> {
    return true;
  }

  public unwrap(error?: string | Error): T {
    return this.get();
  }

  public getOrElse(defaultValue: T): T {
    return this.get();
  }
  public orElse(value: Optional<T>): Some<T> {
    return this;
  }

  public map<U>(f: (value: T) => U): Optional<NonNullable<U>> {
    try {
      return Option.ofNullableNullable(f(this.get()));
    } catch {
      return Option.none();
    }
  }
  public async mapAsync<U>(f: (value: T) => Promise<U>): Promise<Optional<U>> {
    try {
      return Option.ofNullableNullable(await f(this.get()));
    } catch {
      return Option.none();
    }
  }

  public filter(predicate: (value: T) => boolean): Optional<T> {
    try {
      if (predicate(this.get())) {
        return this;
      }
    } catch {}
    return Option.none();
  }

  public async filterAsync(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>> {
    try {
      if (await predicate(this.get())) {
        return this;
      }
    } catch {}
    return Option.none();
  }

  public equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean): boolean {
    if (other.isNone()) {
      return false;
    }

    if (comparator) {
      return comparator(this.get(), other.get());
    }

    return this.get() === other.get();
  }

  public flatMap<U>(f: (value: T) => Optional<U>): Optional<U> {
    try {
      const value = f(this.get());
      if (value.isNone()) {
        return Option.none();
      }

      return Option.ofNullableNullable(value.get()!);
    } catch {
      return Option.none();
    }
  }

  public async flatMapAsync<U>(f: (value: T) => Promise<Optional<U>>): Promise<Optional<U>> {
    try {
      return await f(this.get());
    } catch {
      return Option.none();
    }
  }

  /**
   *
   * @param some Function to execute if option isSome. If this function throws, the result of none will be returned
   * @param none Function to execute if option isNone. If this function throws, the error WILL NOT be caught
   * @returns The result of some if option isSome, otherwise the result of none
   */
  public match<U>(some: (value: T) => U, none: () => U): U {
    try {
      return some(this.get());
    } catch {
      return none();
    }
  }

  public async matchAsync<U>(some: (value: T) => Promise<U>, none: () => Promise<U>): Promise<U> {
    try {
      return await some(this.get());
    } catch {
      return await none();
    }
  }

  public toNullable(): T {
    return this.get();
  }

  public toUndefined(): T {
    return this.get();
  }
}

class None<T extends NonNullable<unknown>> extends Option<T> {
  public isNone(): this is None<NonNullable<T>> {
    return true;
  }

  public isSome(): this is Some<NonNullable<T>> {
    return false;
  }

  public unwrap(error: string | Error = "No value in Option"): T {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }

  public getOrElse(defaultValue: T): T {
    return defaultValue;
  }

  public orElse(value: Optional<T>): Optional<T> {
    return value;
  }

  public map<U>(f: (value: T) => U): None<NonNullable<U>> {
    return this as unknown as None<NonNullable<U>>;
  }

  public async mapAsync<U>(f: (value: T) => Promise<U>): Promise<None<NonNullable<U>>> {
    return Promise.resolve(this as unknown as None<NonNullable<U>>);
  }

  public filter(predicate: (value: T) => boolean): None<T> {
    return this as unknown as None<T>;
  }

  public async filterAsync(predicate: (value: T) => Promise<boolean>): Promise<None<NonNullable<T>>> {
    return Promise.resolve(this as unknown as None<NonNullable<T>>);
  }

  public equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean): boolean {
    return other.isNone();
  }

  public flatMap<U>(f: (value: T) => Optional<U>): None<NonNullable<U>> {
    return this as unknown as None<NonNullable<U>>;
  }

  public async flatMapAsync<U>(f: (value: T) => Promise<Optional<U>>): Promise<None<NonNullable<U>>> {
    return Promise.resolve(this as unknown as None<NonNullable<U>>);
  }

  public match<U>(some: (value: T) => U, none: () => U): U {
    return none();
  }

  public async matchAsync<U>(some: (value: T) => Promise<U>, none: () => Promise<U>): Promise<U> {
    return await none();
  }

  public toNullable(): null {
    return null;
  }

  public toUndefined(): undefined {
    return undefined;
  }
}
