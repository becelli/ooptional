import { Option } from "../index";

describe("Option.isNone", () => {
  it("should return false if option isSome", () => {
    const option = Option.of("foo");
    expect(option.isNone()).toBe(false);
  });

  it("should return true if option isNone", () => {
    const option = Option.none();
    expect(option.isNone()).toBe(true);
  });

  it("should return true if option isNull", () => {
    const option = Option.of(null);
    expect(option.isNone()).toBe(true);
  });

  it("should return true if option isUndefined", () => {
    const option = Option.of(undefined);
    expect(option.isNone()).toBe(true);
  });

  it("should return true if option isNone", () => {
    const option = Option.none();
    expect(option.isNone()).toBe(true);
  });
});
