import { Option } from "../index";

describe("Option.flatMapAsync", () => {
  it("should return the result of the function", async () => {
    const option = Option.ofNullable("foo");
    expect(await option.flatMapAsync(async (value) => Option.ofNullable(value + "bar"))).toEqual(Option.ofNullable("foobar"));
  });

  it("should return None if function returns None", async () => {
    const option = Option.ofNullable("foo");
    expect(await option.flatMapAsync(async () => Option.none())).toEqual(Option.none());
  });

  it("should return None if option is None", async () => {
    const option = Option.none<string>();
    expect(await option.flatMapAsync(async (value) => Option.ofNullable(value + "bar"))).toBe(option);
  });

  it("should return None if option is null", async () => {
    const option = Option.ofNullable<string>(null);
    expect(await option.flatMapAsync(async (value) => Option.ofNullable(value + "bar"))).toBe(option);
  });

  it("should return None if option is undefined", async () => {
    const option = Option.ofNullable<string>(undefined);
    expect(await option.flatMapAsync(async (value) => Option.ofNullable(value + "bar"))).toBe(option);
  });

  it("should return None if function throws", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.flatMapAsync(async () => {
        throw new Error("foo");
      })
    ).toEqual(Option.none());
  });

  it("should return None if function throws a string", async () => {
    const option = Option.ofNullable("foo");
    expect(
      await option.flatMapAsync(async () => {
        throw "foo";
      })
    ).toEqual(Option.none());
  });
});
