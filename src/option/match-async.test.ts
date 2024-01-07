import { Option } from ".";

describe("Option.matchAsync", () => {
  it("should return the result of the function if option isSome", async () => {
    const option = Option.some("foo");
    expect(
      await option.matchAsync(
        async (value) => value.toUpperCase(),
        async () => "bar"
      )
    ).toEqual("FOO");
  });

  it("should return the result of the function if option isNone", async () => {
    const option = Option.none<string>();
    expect(
      await option.matchAsync(
        async () => "foo",
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isNull", async () => {
    const option = Option.of<string>(null);
    expect(
      await option.matchAsync(
        async () => "foo",
        async () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isUndefined", async () => {
    const option = Option.of<string>(undefined);
    expect(
      await option.matchAsync(
        async () => "foo",
        async () => "bar"
      )
    ).toEqual("bar");
  });
});
