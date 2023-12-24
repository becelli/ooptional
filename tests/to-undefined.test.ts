import { Option } from "../index";

describe("Option.toUndefined", () => {
  it("should return the value if option isSome", () => {
    const option = Option.ofNullable("foo");
    expect(option.toUndefined()).toEqual("foo");
  });

  it("should return undefined if option isNone", () => {
    const option = Option.none<string>();
    expect(option.toUndefined()).toBeUndefined();
  });

  it("should return undefined if option isNull", () => {
    const option = Option.ofNullable<string>(null);
    expect(option.toUndefined()).toBeUndefined();
  });

  it("should return undefined if option isUndefined", () => {
    const option = Option.ofNullable<string>(undefined);
    expect(option.toUndefined()).toBeUndefined();
  });
});
