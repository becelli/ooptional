import { Option } from "@/option";

describe("Option.satisfies", () => {
  it("should return true if the value satisfies the predicate", () => {
    expect(Option.of(1).satisfies((n) => n > 0)).toBe(true);
  });

  it("should return false if the value does not satisfy the predicate", () => {
    expect(Option.of(1).satisfies((n) => n < 0)).toBe(false);
  });

  it("should return false if the value is None", () => {
    expect(Option.none<number>().satisfies((n) => n > 0)).toBe(false);
  });
});
