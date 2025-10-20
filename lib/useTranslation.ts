import { useRouter } from "next/router";
import de from "@/messages/de.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import es from "@/messages/es.json";
import it from "@/messages/it.json";

const translations: Record<string, any> = {
  de,
  en,
  fr,
  es,
  it,
};

export function useTranslation() {
  const router = useRouter();
  const locale = router.locale || "de";

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, locale };
}
