import { Option } from ".";

describe("Option.getOrElseAsync", () => {
  it("should return the value if option isSome", async () => {
    const option = Option.of("foo");
    expect(await option.getOrElseAsync(() => Promise.resolve("bar"))).toBe("foo");
  });

  it("should return the default value if option isNone", async () => {
    const option = Option.none();
    expect(await option.getOrElseAsync(() => Promise.resolve("bar"))).toBe("bar");
  });

  it("should return the default value if option isNull", async () => {
    const option = Option.of<string>(null);
    expect(await option.getOrElseAsync(() => Promise.resolve("bar"))).toBe("bar");
  });

  it("should return the default value if option isUndefined", async () => {
    const option = Option.of<string>(undefined);
    expect(await option.getOrElseAsync(() => Promise.resolve("bar"))).toBe("bar");
  });
});
