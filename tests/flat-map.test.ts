import { Option } from "../index";

describe("Option.flatMap", () => {
  it("should return the result of the function", () => {
    const option = Option.ofNullable("foo");
    expect(option.flatMap((value) => Option.ofNullable(value + "bar"))).toEqual(Option.ofNullable("foobar"));
  });

  it("should return None if function returns None", () => {
    const option = Option.ofNullable("foo");
    expect(option.flatMap(() => Option.none())).toEqual(Option.none());
  });

  it("should return None if option is None", () => {
    const option = Option.none<string>();
    expect(option.flatMap((value) => Option.ofNullable(value + "bar"))).toBe(option);
  });

  it("should return None if option is null", () => {
    const option = Option.ofNullable<string>(null);
    expect(option.flatMap((value) => Option.ofNullable(value + "bar"))).toBe(option);
  });

  it("should return None if option is undefined", () => {
    const option = Option.ofNullable<string>(undefined);
    expect(option.flatMap((value) => Option.ofNullable(value + "bar"))).toBe(option);
  });

  it("should return None if function throws", () => {
    const option = Option.ofNullable("foo");
    expect(
      option.flatMap(() => {
        throw new Error("foo");
      })
    ).toEqual(Option.none());
  });

  it("should return None if function throws a string", () => {
    const option = Option.ofNullable("foo");
    expect(
      option.flatMap(() => {
        throw "foo";
      })
    ).toEqual(Option.none());
  });
});
