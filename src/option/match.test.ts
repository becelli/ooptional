import { Option } from ".";

describe("Option.match", () => {
  it("should return the result of the function if option isSome", () => {
    const option = Option.of("foo");
    expect(
      option.match(
        (value) => value.toUpperCase(),
        () => "bar"
      )
    ).toEqual("FOO");
  });

  it("should return the result of the function if option isNone", () => {
    const option = Option.none<string>();
    expect(
      option.match(
        () => "foo",
        () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isNull", () => {
    const option = Option.of<string>(null);
    expect(
      option.match(
        () => "foo",
        () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(
      option.match(
        () => "foo",
        () => "bar"
      )
    ).toEqual("bar");
  });
});
