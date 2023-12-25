import { Option } from "../index";

describe("Option.unwrap", () => {
  it("should return the value if option isSome", () => {
    const option = Option.of("foo");
    expect(option.unwrap()).toBe("foo");
  });

  it("should throw an error if option isNone", () => {
    const option = Option.none();
    expect(() => option.unwrap()).toThrow();
  });

  it("should throw an error if option isNull", () => {
    const option = Option.of(null);
    expect(() => option.unwrap()).toThrow();
  });

  it("should throw an error if option isUndefined", () => {
    const option = Option.of(undefined);
    expect(() => option.unwrap()).toThrow();
  });

  it("should throw an error with the provided error message if option isNone", () => {
    const option = Option.none();
    expect(() => option.unwrap("foo")).toThrow("foo");
  });

  it("should throw the provided error if option isNone", () => {
    const option = Option.none();
    expect(() => option.unwrap(new Error("foo"))).toThrow("foo");
  });
});
