import { Option } from ".";

describe("Option.reduce", () => {
  it("should return the initial value if the Option is None", () => {
    const value = Option.none<number>().reduce(0, (acc, v) => acc + v);
    expect(value).toBe(0);
  });

  it("should return the result of the reducer function if the Option is Some", () => {
    const value = Option.some(1).reduce(0, (acc, v) => acc + v);
    expect(value).toBe(1);
  });
});
