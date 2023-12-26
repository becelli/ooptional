import { Option } from "../index";

describe("Option.orElseAsync", () => {
  it("should return the option if option isSome", async () => {
    const option = Option.of("foo");
    expect(await option.orElseAsync(() => Promise.resolve(Option.of("bar")))).toBe(option);
  });

  it("should return the other option if option isNone", async () => {
    const option = Option.none();
    const other = Option.of("bar");
    expect(await option.orElseAsync(() => Promise.resolve(other))).toBe(other);
  });

  it("should return the other option if option isNull", async () => {
    const option = Option.of<string>(null);
    const other = Option.of("bar");
    expect(await option.orElseAsync(() => Promise.resolve(other))).toBe(other);
  });

  it("should return the other option if option isUndefined", async () => {
    const option = Option.of<string>(undefined);
    const other = Option.of("bar");
    expect(await option.orElseAsync(() => Promise.resolve(other))).toBe(other);
  });
});
