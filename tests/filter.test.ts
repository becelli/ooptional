import { Option } from "../index";

describe("Option.filter", () => {
  it("should return the option if predicate returns true", () => {
    const option = Option.ofNullable("foo");
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate returns false", () => {
    const option = Option.ofNullable("foo");
    expect(option.filter((value) => value === "bar")).toEqual(Option.none());
  });

  it("should return None if option is None", () => {
    const option = Option.none<string>();
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if option is null", () => {
    const option = Option.ofNullable<string>(null);
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if option is undefined", () => {
    const option = Option.ofNullable<string>(undefined);
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate throws", () => {
    const option = Option.ofNullable("foo");
    expect(
      option.filter(() => {
        throw new Error("foo");
      })
    ).toEqual(Option.none());
  });

  it("should return None if predicate throws a string", () => {
    const option = Option.ofNullable("foo");
    expect(
      option.filter(() => {
        throw "foo";
      })
    ).toEqual(Option.none());
  });
});
