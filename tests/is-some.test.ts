import { Option } from "../index";

describe("Option.isSome", () => {
  it("should return true if option isSome", () => {
    const option = Option.of("foo");
    expect(option.isSome()).toBe(true);
  });

  it("should return false if option isNone", () => {
    const option = Option.none();
    expect(option.isSome()).toBe(false);
  });

  it("should return false if option isNull", () => {
    const option = Option.of(null);
    expect(option.isSome()).toBe(false);
  });

  it("should return false if option isUndefined", () => {
    const option = Option.of(undefined);
    expect(option.isSome()).toBe(false);
  });
});
