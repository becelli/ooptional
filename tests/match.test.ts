import { Option } from "../index";

describe("Option.match", () => {
  it("should return the result of the function if option isSome", () => {
    const option = Option.ofNullable("foo");
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
    const option = Option.ofNullable<string>(null);
    expect(
      option.match(
        () => "foo",
        () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isUndefined", () => {
    const option = Option.ofNullable<string>(undefined);
    expect(
      option.match(
        () => "foo",
        () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isSome and function throws", () => {
    const option = Option.ofNullable("foo");
    expect(
      option.match(
        () => {
          throw new Error("foo");
        },
        () => "bar"
      )
    ).toEqual("bar");
  });

  it("should return the result of the function if option isSome and function throws a string", () => {
    const option = Option.ofNullable("foo");
    const mock = jest.fn();
    expect(
      option.match(
        () => {
          mock();
          throw "foo";
        },
        () => "bar"
      )
    ).toEqual("bar");
    expect(mock).toHaveBeenCalled();
  });

  it("should throw the error if option isSome and function throws in both cases", () => {
    const option = Option.ofNullable("foo");
    const mockSuccess = jest.fn();
    const mockFailure = jest.fn();

    expect(() =>
      option.match(
        () => {
          mockSuccess();
          throw new Error("foo");
        },
        () => {
          mockFailure();
          throw new Error("bar");
        }
      )
    ).toThrow("bar");

    expect(mockSuccess).toHaveBeenCalled();
    expect(mockFailure).toHaveBeenCalled();
  });

  it("should return the result of the function if option isNone and function throws", () => {
    const option = Option.none<string>();
    const mockSuccess = jest.fn();
    const mockFailure = jest.fn();
    try {
      option.match(
        () => {
          mockSuccess();
          throw new Error("foo");
        },
        () => {
          mockFailure();
          throw new Error("bar");
        }
      );
    } catch {}
    expect(mockSuccess).not.toHaveBeenCalled();
    expect(mockFailure).toHaveBeenCalled();
  });

  it("should return the result of the function if option isNone and function throws a string", () => {
    const option = Option.none<string>();
    const mock = jest.fn();
    try {
      option.match(
        () => "foo",
        () => {
          mock();
          throw "foo";
        }
      );
    } catch {}

    expect(mock).toHaveBeenCalled();
  });

  it("should return the result of the function if option isNull and function throws", () => {
    const option = Option.ofNullable<string>(null);
    const mock = jest.fn();
    try {
      option.match(
        () => "foo",
        () => {
          mock();
          throw new Error("foo");
        }
      );
    } catch {}
    expect(mock).toHaveBeenCalled();
  });
  it("should return the result of the function if option isNull and function throws a string", () => {
    const option = Option.ofNullable<string>(null);
    const mock = jest.fn();
    try {
      option.match(
        () => "foo",
        () => {
          mock();
          throw "foo";
        }
      );
    } catch {}
    expect(mock).toHaveBeenCalled();
  });
});
