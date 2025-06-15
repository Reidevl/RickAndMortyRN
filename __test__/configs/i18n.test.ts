import i18n from "@/src/shared/i18n/i18n";

jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageCode: "es" }],
}));

describe("i18n configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load Spanish as default locale", () => {
    expect(i18n.defaultLocale).toBe("es");
  });

  it("should use fallback translations", () => {
    expect(i18n.enableFallback).toBe(true);
  });

  it("should return correct Spanish translation", () => {
    i18n.locale = "es";
    expect(i18n.t("tabs.characters")).toBe("Personajes");
  });

  it("should return correct English translation", () => {
    i18n.locale = "en";
    expect(i18n.t("tabs.characters")).toBe("Characters");
  });
});
