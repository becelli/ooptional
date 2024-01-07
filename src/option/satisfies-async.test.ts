import { Option } from "@/option";

describe("Option.satisfiesAsync", () => {
  it("should return true if the value satisfies the predicate", async () => {
    expect(await Option.of(1).satisfiesAsync(async (n) => n > 0)).toBe(true);
  });

  it("should return false if the value does not satisfy the predicate", async () => {
    expect(await Option.of(1).satisfiesAsync(async (n) => n < 0)).toBe(false);
  });

  it("should return false if the value is None", async () => {
    expect(await Option.none<number>().satisfiesAsync(async (n) => n > 0)).toBe(false);
  });
});
