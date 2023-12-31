import { Option } from ".";

describe("Option.filter", () => {
  it("should return the option if predicate returns true", () => {
    const option = Option.of("foo");
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate returns false", () => {
    const option = Option.of("foo");
    expect(option.filter((value) => value === "bar")).toEqual(Option.none());
  });

  it("should return None if option is None", () => {
    const option = Option.none<string>();
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if option is null", () => {
    const option = Option.of<string>(null);
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if option is undefined", () => {
    const option = Option.of<string>(undefined as string | undefined);
    expect(option.filter((value) => value === "foo")).toBe(option);
  });
});
