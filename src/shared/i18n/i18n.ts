import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const translations = {
  en: {
    notFound: {
      title: "This screen does not exist.",
      goHome: "Go to home screen!",
    },
    tabs: {
      characters: "Characters",
      episodes: "Episodes",
    },
    characters: {
      title: "Characters",
      search: "Search characters...",
      status: "Status",
      species: "Species",
      gender: "Gender",
      origin: "Origin",
      location: "Location",
      noCharactersFound: "No characters found.",
      sortedNormal: "Normal",
      sortedAZ: "A-Z",
      sortedZA: "Z-A",
    },
    filters: {
      status: {
        all: "All",
        alive: "Alive",
        dead: "Dead",
        unknown: "Unknown",
      },
      gender: {
        all: "All",
        female: "Female",
        male: "Male",
        genderless: "Genderless",
        unknown: "Unknown",
      },
      species: {
        all: "All",
        human: "Human",
        alien: "Alien",
        robot: "Robot",
        unknown: "Unknown",
      },
      sorted: {
        az: "A-Z",
        za: "Z-A",
      },
    },
    episodes: {
      title: "Episodes",
      search: "Search episodes...",
      airDate: "Air Date",
      episode: "Episode",
    },
  },
  es: {
    notFound: {
      title: "Esta pantalla no existe.",
      goHome: "¡Ir a la pantalla principal!",
    },
    tabs: {
      characters: "Personajes",
      episodes: "Episodios",
    },
    characters: {
      title: "Personajes",
      search: "Buscar personajes...",
      status: "Estado",
      species: "Especie",
      gender: "Género",
      origin: "Origen",
      location: "Ubicación",
      noCharactersFound: "No se encontraron personajes.",
      sortedNormal: "Normal",
      sortedAZ: "A-Z",
      sortedZA: "Z-A",
    },
    filters: {
      status: {
        all: "Todos",
        alive: "Vivo",
        dead: "Muerto",
        unknown: "Desconocido",
      },
      gender: {
        all: "Todos",
        female: "Femenino",
        male: "Masculino",
        genderless: "Sin género",
        unknown: "Desconocido",
      },
      species: {
        all: "Todos",
        human: "Humano",
        alien: "Alienígena",
        robot: "Robot",
        unknown: "Desconocido",
      },
      sorted: {
        az: "A-Z",
        za: "Z-A",
      },
    },
    episodes: {
      title: "Episodios",
      search: "Buscar episodios...",
      airDate: "Fecha de emisión",
      episode: "Episodio",
    },
  },
};

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app
i18n.locale = getLocales()[0].languageCode ?? "es";

// When a value is missing from a language it'll fallback to another language with the key present
i18n.enableFallback = true;
i18n.defaultLocale = "es";

export default i18n;
