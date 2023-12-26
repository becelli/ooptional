import { Option } from "../index";

describe("Option.flatMap", () => {
  it("should return the result of the function", () => {
    const option = Option.of("foo");
    const result = option.flatMap((value) => Option.of(value + "bar"));
    expect(option.flatMap((value) => Option.of(value + "bar"))).toEqual(Option.of("foobar"));
  });

  it("should return None if function returns None", () => {
    const option = Option.of("foo");
    expect(option.flatMap(() => Option.none())).toEqual(Option.none());
  });

  it("should return None if option is None", () => {
    const option = Option.none<string>();
    expect(option.flatMap((value) => Option.of(value + "bar"))).toBe(option);
  });

  it("should return None if option is null", () => {
    const option = Option.of<string>(null);
    expect(option.flatMap((value) => Option.of(value + "bar"))).toBe(option);
  });

  it("should return None if option is undefined", () => {
    const option = Option.of<string>(undefined);
    expect(option.flatMap((value) => Option.of(value + "bar"))).toBe(option);
  });
});
