import { Option } from ".";

describe("Option.toNullable", () => {
  it("should return the value if option isSome", () => {
    const option = Option.of("foo");
    expect(option.toNullable()).toEqual("foo");
  });

  it("should return null if option isNone", () => {
    const option = Option.none<string>();
    expect(option.toNullable()).toBeNull();
  });

  it("should return null if option isNull", () => {
    const option = Option.of<string>(null);
    expect(option.toNullable()).toBeNull();
  });

  it("should return null if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(option.toNullable()).toBeNull();
  });
});
