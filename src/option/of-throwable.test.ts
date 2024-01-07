import { Option } from ".";

describe("Option.ofThrowable", () => {
  it("should return Some if function does not throw", () => {
    const option = Option.ofThrowable(() => "foo");
    expect(option).toEqual(Option.of("foo"));
  });

  it("should return None if function throws", () => {
    const option = Option.ofThrowable(() => {
      throw new Error("foo");
    });
    expect(option).toEqual(Option.none());
  });

  it("should return None if function throws a string", () => {
    const option = Option.ofThrowable(() => {
      throw "foo";
    });
    expect(option).toEqual(Option.none());
  });
});
