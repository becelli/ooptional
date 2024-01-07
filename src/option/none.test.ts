import { Option } from "@/option";
describe("Option.none", () => {
  it("should return a None", () => {
    const value = Option.none();
    expect(value.isNone()).toBe(true);
  });

  it("should not be able to construct a None with a value", () => {
    // @ts-expect-error
    const value = Option.none(1);
    // if the error is not thrown, the value will be a None(1)
    expect(value.isNone()).toBe(true);
  });
});
