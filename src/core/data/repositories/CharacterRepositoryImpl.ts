import { apolloClient } from "@graphql/client";
import { GET_CHARACTER, GET_CHARACTERS } from "@graphql/queries/characters";
import {
  CharacterResponse,
  CharactersResponse,
  CharactersVariables,
  CharacterVariables
} from "@graphql/types/characters";
// Domain
import { CharacterFilters } from "@entities/Character";
import { CharacterRepository } from "@repositories/CharacterRepository";

export class CharacterRepositoryImpl implements CharacterRepository {
  async getCharacters(filters?: CharacterFilters) {
    const { data } = await apolloClient.query<CharactersResponse, CharactersVariables>({
      query: GET_CHARACTERS,
      variables: {
        page: filters?.page || 1,
        filter: {
          name: filters?.name,
          status: filters?.status,
          species: filters?.species,
        },
      },
    });

    return {
      characters: data.characters.results,
      totalPages: data.characters.info.pages,
    };
  }

  async getCharacterById(id: string) {
    const { data } = await apolloClient.query<CharacterResponse, CharacterVariables>({
      query: GET_CHARACTER,
      variables: { id },
    });

    return data.character;
  }

  async getCharactersByIds(ids: string[]) {
    const characters = await Promise.all(
      ids.map((id) => this.getCharacterById(id))
    );
    return characters;
  }
}
