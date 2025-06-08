import { useCallback, useEffect, useState } from "react";
// Data
import { CharacterRepositoryImpl } from "@data/repositories/CharacterRepositoryImpl";
// Domain
import {
  Character,
  CharacterGender,
  CharacterStatus,
} from "@entities/Character";

const characterRepository = new CharacterRepositoryImpl();

export function useCharacters() {
  const [filters, setFilters] = useState<{
    name?: string;
    status?: CharacterStatus;
    species?: string;
    gender?: CharacterGender;
    page?: number;
  }>({ page: 1 });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await characterRepository.getCharacters({
        name: filters.name,
        status: filters.status,
        species: filters.species,
        page: filters.page,
        gender: filters.gender,
      });
      const filtered = filters.gender
        ? result.characters.filter((c) => c.gender === filters.gender)
        : result.characters;
      setCharacters(filtered);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  // MARK: - Filter setters
  const setName = useCallback(
    (name: string) => setFilters((f) => ({ ...f, name, page: 1 })),
    []
  );
  const setStatus = useCallback(
    (status: string) =>
      setFilters((f) => ({
        ...f,
        status: status === "All" ? undefined : (status as CharacterStatus),
        page: 1,
      })),
    []
  );
  const setSpecies = useCallback(
    (species: string) => setFilters((f) => ({ ...f, species, page: 1 })),
    []
  );
  const setGender = useCallback(
    (gender: string) =>
      setFilters((f) => ({
        ...f,
        gender: gender === "All" ? undefined : (gender as CharacterGender),
        page: 1,
      })),
    []
  );
  const setPage = useCallback(
    (page: number) => setFilters((f) => ({ ...f, page })),
    []
  );

  return {
    characters,
    totalPages,
    loading,
    error,
    filters,
    setName,
    setStatus,
    setSpecies,
    setGender,
    setPage,
    refetch: fetchCharacters,
  };
}
