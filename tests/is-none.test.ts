import { Option } from "../index";

describe("Option.isNone", () => {
  it("should return false if option isSome", () => {
    const option = Option.ofNullable("foo");
    expect(option.isNone()).toBe(false);
  });

  it("should return true if option isNone", () => {
    const option = Option.none();
    expect(option.isNone()).toBe(true);
  });

  it("should return true if option isNull", () => {
    const option = Option.ofNullable(null);
    expect(option.isNone()).toBe(true);
  });

  it("should return true if option isUndefined", () => {
    const option = Option.ofNullable(undefined);
    expect(option.isNone()).toBe(true);
  });

  it("should return true if option isNone", () => {
    const option = Option.none();
    expect(option.isNone()).toBe(true);
  });
});
