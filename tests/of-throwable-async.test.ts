import { Option } from "../index";

describe("Option.ofThrowableAsync", () => {
  it("should return Some if function does not throw", async () => {
    const option = await Option.ofThrowableAsync(async () => "foo");
    expect(option).toEqual(Option.ofNullable("foo"));
  });

  it("should return None if function throws", async () => {
    const option = await Option.ofThrowableAsync(async () => {
      throw new Error("foo");
    });
    expect(option).toEqual(Option.none());
  });

  it("should return None if function throws a string", async () => {
    const option = await Option.ofThrowableAsync(async () => {
      throw "foo";
    });
    expect(option).toEqual(Option.none());
  });
});
