import { IAppLang, IData } from "./interface";

export const CONSTANTS = {
  APP_NAME: "myakawo",
  MIN_MODAL_HEIGHT: 234
};

export const enum AppLang {
  en = "en",
  fr = "fr"
}

export const enum AppErrors {
  UNAUTHENTICATED = "UNAUTHENTICATED"
}

export const appLanguage: IAppLang[] = [
  { lang: "english", local: AppLang.en },
  { lang: "french", local: AppLang.fr }
];

export const appModals = {
  IMAGE_PICKER: "IMAGE_PICKER"
};

export const daysOfWeeks: IData[] = [
  { key: "mon", label: "mon" },
  { key: "tues", label: "tues" },
  { key: "wed", label: "wed" },
  { key: "thurs", label: "thurs" },
  { key: "fri", label: "fri" },
  { key: "sat", label: "sat" },
  { key: "sun", label: "sun" }
];
