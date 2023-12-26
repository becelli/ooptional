import { Option } from "../index";

describe("Option.fold", () => {
  it("should return the result of the reducer function if the Option is Some", () => {
    const value = Option.some(1).fold(
      (v) => v + 1,
      () => 0
    );
    expect(value).toBe(2);
  });

  it("should return the result of the reducer function if the Option is None", () => {
    const value = Option.none<number>().fold(
      (v) => v + 1,
      () => 0
    );
    expect(value).toBe(0);
  });
});
