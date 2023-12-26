[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

OOptional is a TypeScript library that provides an optional type that fits nicely with Object Oriented Programming. It provides a way to handle optional values without resorting to null or undefined.

## Installation

To install the library, you can use npm:

```sh
npm install ooptional
```

## Usage

### Importing

```ts
import { Optional, Option } from "ooptional";
```

## Practical example: validating a user

```ts
import { Optional, Option } from "ooptional";

export class UserService {
  // no optional type 😥
  public verifyCanCreateAccount(user: User): boolean {
    if (user.age < 18) {
      return false;
    }

    if (!user.email) {
      return false;
    }

    if (!user.password) {
      return false;
    }

    return true;
  }

  // with optional type 😋
  public verifyCanCreateAccount(user: User): boolean {
    return Option.of(user)
      .filter((user) => user.age >= 18)
      .filter((user) => user.email)
      .filter((user) => user.password)
      .isSome();
  }
}
```

### Creating an Optional

```ts
const optional: Optional<string> = Option.of("Hello, world!");

// or
const some: Some<string> = Option.some("Hello, world!");
const someAsOptional: Optional<string> = Option.some("Hello, world!");

// or
const none: None<string> = Option.none();
const noneAsOptional: Optional<string> = Option.none();
```

### Checking if an Optional has a value

```ts
const optional: Optional<string> = Option.of("Hello, world!");

if (optional.isSome()) {
  console.log(
    `It automatically inferred the type as Some<string> and can access the value using the get() method: ${optional.get()}`
  );
} else {
  console.log("It is None");
}
```

### Option class

The `Option` class has the following methods:

- `isNone()`: Returns false as this is the `Some` variant of `Option`.
- `isSome()`: Returns true as this is the `Some` variant of `Option`.
- `unwrap(error?: string | Error)`: Returns the value if it exists, otherwise throws the provided error.
- `getOrElse(value: () => T)`: Returns the value if it exists, otherwise returns the provided value.
- `getOrElseAsync(value: () => Promise<T>)`: Returns the value if it exists, otherwise returns the provided value.
- `orElse(value: () => Optional<T>)`: Returns the current `Optional` instance if it is `Some`, otherwise returns the provided value.
- `orElseAsync(value: () => Promise<Optional<T>>)`: Returns the current `Optional` instance if it is `Some`, otherwise returns the provided value.
- `map<U>(f: (value: T) => U)`: Applies a function to the contained value and returns a new `Optional` instance with the result.
- `mapAsync<U>(f: (value: T) => Promise<U>)`: Applies an asynchronous function to the contained value and returns a new `Optional` instance with the result.
- `filter(predicate: (value: T) => boolean)`: Applies a predicate to the contained value and returns an `Optional` instance depending on the predicate result.
- `filterAsync(predicate: (value: T) => Promise<boolean>)`: Applies an asynchronous predicate to the contained value and returns an `Optional` instance depending on the predicate result.
- `equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean)`: Checks if the current `Optional` instance is equal to another one.
- `equalsAsync(other: Optional<T>, comparator?: (a: T, b: T) => Promise<boolean>)`: Checks if the current `Optional` instance is equal to another one.
- `flatMap<U>(f: (value: T) => Optional<U>)`: Applies a function to the contained value and returns a new `Optional` instance with the result.
- `flatMapAsync<U>(f: (value: T) => Promise<Optional<U>>)`: Applies an asynchronous function to the contained value and returns a new `Optional` instance with the result.
- `fold<U>(ifNone: () => U, ifSome: (value: T) => U)`: Applies a function to the contained value depending on whether it is `Some` or `None`.
- `foldAsync<U>(ifNone: () => Promise<U>, ifSome: (value: T) => Promise<U>)`: Applies an asynchronous function to the contained value depending on whether it is `Some` or `None`.
- `reduce<U>(reducer: (accumulator: U, value: T) => U, initialValue: U): U`: Applies a reducer function to the contained value and returns the result.
- `reduceAsync<U>(reducer: (accumulator: U, value: T) => Promise<U>, initialValue: U): Promise<U>`: Applies an asynchronous reducer function to the contained value and returns the result.
- `match<U>(ifNone: () => U, ifSome: (value: T) => U): U`: Applies a function to the contained value depending on whether it is `Some` or `None`.
- `matchAsync<U>(ifNone: () => Promise<U>, ifSome: (value: T) => Promise<U>): Promise<U>`: Applies an asynchronous function to the contained value depending on whether it is `Some` or `None`.
- `toNullable(): T | null`: Returns the value if it exists, otherwise returns null.
- `toUndefined(): T | undefined`: Returns the value if it exists, otherwise returns undefined.

### Some class

The `Some` class is one of the variants of `Option`. It represents a value that exists. It has similar methods to `None`, but they behave differently as they have a value to work with.

- `get()`: Returns the value if it exists, otherwise throws an error.
- All the methods from `Option`.

### None class

The `None` class is the other variant of `Option`. It represents an absence of value. It has similar methods to `Some`, but they behave differently as they don't have a value to work with.

- All the methods from `Option`.

# Contributing

## Building

To build the project, run the following command:

```sh
pnpm run build
```

## Testing

To run the tests, use the following command:

```sh
pnpm run test
```

## Linting

To lint the code, run the following command:

```sh
pnpm run lint
```

## License

This project is licensed under the MIT License.
