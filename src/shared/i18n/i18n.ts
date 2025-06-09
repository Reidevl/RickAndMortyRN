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
      characterError: "Error loading character.",
      gender: "Gender",
      location: "Location",
      noCharactersFound: "No characters found.",
      origin: "Origin",
      search: "Search characters...",
      sortedAZ: "A-Z",
      sortedNormal: "Normal",
      sortedZA: "Z-A",
      species: "Species",
      status: "Status",
      title: "Characters",
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
      episodeCharacters: "Episode characters",
      episodeCode: "Episode code",
      episode: "Episode",
      error: "Error loading episodes.",
      noEpisodesFound: "No episodes found.",
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
      characterError: "Error al cargar el personaje.",
      gender: "Género",
      location: "Ubicación",
      noCharactersFound: "No se encontraron personajes.",
      origin: "Origen",
      search: "Buscar personajes...",
      sortedAZ: "A-Z",
      sortedNormal: "Normal",
      sortedZA: "Z-A",
      species: "Especie",
      status: "Estado",
      title: "Personajes",
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
      episodeCharacters: "Personajes del episodio",
      episodeCode: "Código del episodio",
      episode: "Episodio",
      error: "Error al cargar los episodios.",
      noEpisodesFound: "No se encontraron episodios.",
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
