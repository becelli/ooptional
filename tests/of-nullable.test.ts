import { Option } from "../index";

describe("Option.of", () => {
  it("should return a Some when the value is not null or undefined", () => {
    const value = Option.ofNullable(1);
    expect(value.isSome()).toBe(true);
    expect(value.isNone()).toBe(false);
  });

  it("should return a None when the value is null", () => {
    const value = Option.ofNullable(null);
    expect(value.isNone()).toBe(true);
  });

  it("should return a None when the value is undefined", () => {
    const value = Option.ofNullable(undefined);
    expect(value.isNone()).toBe(true);
  });
});
