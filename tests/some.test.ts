import { Option } from "../index";

describe("Option.some", () => {
  it("should return a Some when the value is not null or undefined", () => {
    const value = Option.some(1);
    expect(value.isSome()).toBe(true);
    expect(value.isNone()).toBe(false);
  });

  it("should throw if caller tries to construct a Some with a null value", () => {
    // @ts-expect-error
    expect(() => Option.some(null)).toThrow();
  });

  it("should not be able to construct a Some when the value is undefined", () => {
    // @ts-expect-error
    expect(() => Option.some(undefined)).toThrow();
  });

  it("should be able to construct a Some when the value is null or undefined", () => {
    // @ts-expect-error
    expect(() => Option.some(null as number | null | undefined)).toThrow();
  });
});
