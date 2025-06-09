import { useEffect, useMemo, useState } from "react";
// Data
import { CharacterRepositoryImpl } from "@data/repositories/CharacterRepositoryImpl";
import { Character, Episode } from "@entities/Character";

const characterRepository = new CharacterRepositoryImpl();

export const useCharacter = (id: string | number | undefined) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    characterRepository
      .getCharacterById(String(id))
      .then(setCharacter)
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }, [id]);

  // Group episodes by season
  const episodesBySeason: Record<string, Episode[]> = useMemo(() => {
    if (!character?.episode) return {};
    return character.episode.reduce(
      (acc: Record<string, typeof character.episode>, ep) => {
        const match = ep.episode.match(/S(\d+)E\d+/);
        const season = match ? `Season ${parseInt(match[1], 10)}` : "Other";
        if (!acc[season]) acc[season] = [];
        acc[season].push(ep);
        return acc;
      },
      {}
    );
  }, [character]);

  return { character, episodesBySeason, loading, error };
};
