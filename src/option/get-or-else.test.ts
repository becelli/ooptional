import { Option } from "@/option";

describe("Option.getOrElse", () => {
  it("should return the value if option isSome", () => {
    const option = Option.of("foo");
    expect(option.getOrElse(() => "bar")).toBe("foo");
  });

  it("should return the default value if option isNone", () => {
    const option = Option.none();
    expect(option.getOrElse(() => "bar")).toBe("bar");
  });

  it("should return the default value if option isNull", () => {
    const option = Option.of<string>(null);
    expect(option.getOrElse(() => "bar")).toBe("bar");
  });

  it("should return the default value if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(option.getOrElse(() => "bar")).toBe("bar");
  });
});
