import { useLocalSearchParams } from "expo-router";

export default function EpisodePage() {
  const { id } = useLocalSearchParams();

  return (
    <div>
      <h1>Episode {id}</h1>
    </div>
  );
}
