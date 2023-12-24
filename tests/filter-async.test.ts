import { Option } from "../index";

describe("Option.filterAsync", () => {
  it("should return the option if predicate returns true", async () => {
    const option = Option.ofNullable("foo");
    expect(await option.filterAsync(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate returns false", async () => {
    const option = Option.ofNullable("foo");
    expect(await option.filterAsync(async (value) => value === "bar")).toEqual(Option.none());
  });

  it("should return None if option is None", async () => {
    const option = Option.none<string>();
    expect(await option.filterAsync(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if option is null", async () => {
    const option = Option.ofNullable<string>(null);
    expect(await option.filterAsync(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if option is undefined", async () => {
    const option = Option.ofNullable<string>(undefined);
    expect(await option.filterAsync(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate throws", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.filterAsync(async () => {
        throw new Error("foo");
      })
    ).toEqual(Option.none());
  });

  it("should return None if predicate throws a string", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.filterAsync(async () => {
        throw "foo";
      })
    ).toEqual(Option.none());
  });
});
