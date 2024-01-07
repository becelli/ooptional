import { Option } from ".";

describe("Option.some", () => {
  it("should return a Some when the value is not null or undefined", () => {
    const value = Option.some(1);
    expect(value.isSome()).toBe(true);
    expect(value.isNone()).toBe(false);
  });

  it("should lint when the value is null", () => {
    // @ts-expect-error
    Option.some(null);
  });

  it("should lint when the value is undefined", () => {
    // @ts-expect-error
    Option.some(undefined);
  });
});
