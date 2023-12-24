import { Option } from "../index";

describe("Option.mapAsync", () => {
  it("should return the mapped value if option isSome", async () => {
    const option = Option.ofNullable("foo");
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toEqual(Option.ofNullable("FOO"));
  });

  it("should return the option if option isNone", async () => {
    const option = Option.none<string>();
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isNull", async () => {
    const option = Option.ofNullable<string>(null);
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isUndefined", async () => {
    const option = Option.ofNullable<string>(undefined);
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toBe(option);
  });

  it("should return none if option isSome and function throws", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.mapAsync(async () => {
        throw new Error("foo");
      })
    ).toEqual(Option.none());
  });

  it("should return none if option isSome and function throws a string", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.mapAsync(async () => {
        throw "foo";
      })
    ).toEqual(Option.none());
  });
});
