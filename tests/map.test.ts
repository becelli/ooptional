import { Option } from "../index";

describe("Option.map", () => {
  it("should return the mapped value if option isSome", () => {
    const option = Option.ofNullable("foo");
    expect(option.map((value) => value.toUpperCase())).toEqual(Option.ofNullable("FOO"));
  });

  it("should return the option if option isNone", () => {
    const option = Option.none<string>();
    expect(option.map((value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isNull", () => {
    const option = Option.ofNullable<string>(null);
    expect(option.map((value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isUndefined", () => {
    const option = Option.ofNullable<string>(undefined);
    expect(option.map((value) => value.toUpperCase())).toBe(option);
  });

  it("should return none if option isSome and function throws", () => {
    const option = Option.ofNullable("foo");
    expect(
      option.map(() => {
        throw new Error("foo");
      })
    ).toEqual(Option.none());
  });

  it("should return none if option isSome and function throws a string", () => {
    const option = Option.ofNullable("foo");
    expect(
      option.map(() => {
        throw "foo";
      })
    ).toEqual(Option.none());
  });
});
