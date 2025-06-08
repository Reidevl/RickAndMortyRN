import { useLocalSearchParams } from "expo-router/build/hooks";

export default function CharcaterPage() {
  const { id } = useLocalSearchParams();
  
  return (
    <div>
      <h1>Character {id}</h1>
    </div>
  );
}
