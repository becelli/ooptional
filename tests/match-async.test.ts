import { Option } from "../index";

describe("Option.matchAsync", () => {
  it("should return the result of the function if option isSome", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.matchAsync(
        async (value) => value.toUpperCase(),
        async () => "bar"
      )
    ).toEqual("FOO");
  });

  it("should return the result of the function if option isNone", async () => {
    const option = Option.none<string>();
    expect(
      await option.matchAsync(
        async () => "foo",
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isNull", async () => {
    const option = Option.ofNullable<string>(null);
    expect(
      await option.matchAsync(
        async () => "foo",
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isUndefined", async () => {
    const option = Option.ofNullable<string>(undefined);
    expect(
      await option.matchAsync(
        async () => "foo",
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isSome and function throws", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.matchAsync(
        async () => {
          throw new Error("foo");
        },
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isSome and function throws a string", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.matchAsync(
        async () => {
          throw "foo";
        },
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isSome and function returns a Promise that rejects", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.matchAsync(
        async () => {
          return Promise.reject("foo");
        },
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isSome and function returns a Promise that rejects with an Error", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.matchAsync(
        async () => {
          return Promise.reject(new Error("foo"));
        },
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isSome and function returns a Promise that rejects with a string", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.matchAsync(
        async () => {
          return Promise.reject("foo");
        },
        async () => "bar"
      )
    ).toEqual("bar");
  });
});
