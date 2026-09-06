import { cookies } from "next/headers";
import { getDictionary, type Locale } from "./dictionaries";

export function getLocale(): Locale {
  const value = cookies().get("locale")?.value;
  return value === "en" ? "en" : "pt";
}

export function getServerDictionary() {
  const locale = getLocale();
  return { locale, dict: getDictionary(locale) };
}
