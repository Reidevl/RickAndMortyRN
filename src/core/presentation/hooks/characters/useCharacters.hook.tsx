import { useCallback, useEffect, useMemo, useState } from "react";
// Data
import { CharacterRepositoryImpl } from "@data/repositories/CharacterRepositoryImpl";
// Domain
import {
  Character,
  CharacterGender,
  CharacterSpecies,
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
  const [sort, setSort] = useState<"normal" | "az" | "za">("normal");

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
    (species: string) =>
      setFilters((f) => ({
        ...f,
        species: species === "All" ? undefined : (species as CharacterSpecies),
        page: 1,
      })),
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

  // MARK: - Sort
  const sortedCharacters = useMemo(() => {
    if (sort === "az") {
      return [...characters].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "za") {
      return [...characters].sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sort === "normal") {
      return characters;
    }
    return characters;
  }, [characters, sort]);

  return {
    characters: sortedCharacters,
    totalPages,
    loading,
    error,
    filters,
    sort,
    setName,
    setStatus,
    setSpecies,
    setGender,
    setPage,
    setSort,
    refetch: fetchCharacters,
  };
}
