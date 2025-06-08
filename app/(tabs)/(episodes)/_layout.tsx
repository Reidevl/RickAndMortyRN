import { Stack } from 'expo-router';

export default function EpisodesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Episodes"
      }}/>
      <Stack.Screen name="episode/[id]" options={{
        title: "Episode", //TODO: Add episode name
      }}/>
    </Stack>
  );
}
