import useTranslation from "@hooks/useTranslation";
import i18n from "@i18n/i18n";
import { act, renderHook } from "@testing-library/react-native";

// Mock i18n
jest.mock("@i18n/i18n", () => ({
  t: jest.fn((key) => `translated_${key}`),
  locale: "en",
}));

describe("useTranslation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should translate a key correctly", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t("test.key")).toBe("translated_test.key");
    expect(i18n.t).toHaveBeenCalledWith("test.key");
  });

  it("should return current locale", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.locale).toBe("en");
  });

  it("should change locale when setLocale is called", () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setLocale("es");
    });

    expect(i18n.locale).toBe("es");
  });

  it("should maintain translation function reference between renders", () => {
    const { result, rerender } = renderHook(() => useTranslation());
    const firstT = result.current.t;

    rerender(result.current);

    expect(result.current.t).toBe(firstT);
  });

  it("should maintain setLocale function reference between renders", () => {
    const { result, rerender } = renderHook(() => useTranslation());
    const firstSetLocale = result.current.setLocale;

    rerender(result.current);

    expect(result.current.setLocale).toBe(firstSetLocale);
  });
});
