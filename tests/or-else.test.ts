import { Option } from "../index";

describe("Option.orElse", () => {
  it("should return the option if option isSome", () => {
    const option = Option.ofNullable("foo");
    expect(option.orElse(Option.ofNullable("bar"))).toBe(option);
  });

  it("should return the other option if option isNone", () => {
    const option = Option.none();
    const other = Option.ofNullable("bar");
    expect(option.orElse(other)).toBe(other);
  });

  it("should return the other option if option isNull", () => {
    const option = Option.ofNullable<string>(null);
    const other = Option.ofNullable("bar");
    expect(option.orElse(other)).toBe(other);
  });

  it("should return the other option if option isUndefined", () => {
    const option = Option.ofNullable<string>(undefined);
    const other = Option.ofNullable("bar");
    expect(option.orElse(other)).toBe(other);
  });
});
