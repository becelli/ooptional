import { Option } from ".";

describe("Option.equalsAsync", () => {
  it("should return true if both Options are None", async () => {
    const value = await Option.none<number>().equalsAsync(Option.none<number>(), async (a, b) => a === b);
    expect(value).toBe(true);
  });

  it("should return false if one Option is None", async () => {
    const value = await Option.none<number>().equalsAsync(Option.some(1), async (a, b) => a === b);
    expect(value).toBe(false);
  });

  it("should return true if both Options are Some and the values are equal", async () => {
    const value = await Option.some(1).equalsAsync(Option.some(1), async (a, b) => a === b);
    expect(value).toBe(true);
  });

  it("should return false if both Options are Some and the values are not equal", async () => {
    const value = await Option.some(1).equalsAsync(Option.some(2), async (a, b) => a === b);
    expect(value).toBe(false);
  });

  it("should use the provided equality function", async () => {
    await Option.some({ foo: "bar" }).equalsAsync(Option.some({ foo: "bar" }), async (a, b) => a.foo === b.foo);
  });

  it("should use the default equality function if none is provided", async () => {
    const value = await Option.some({ foo: "bar" }).equalsAsync(Option.some({ foo: "bar" }));
    expect(value).toBe(false);
  });

  it("should return false if the option is Some and the other is None", async () => {
    const value = await Option.some(1).equalsAsync(Option.none<number>(), async (a, b) => a === b);
    expect(value).toBe(false);
  });
});
