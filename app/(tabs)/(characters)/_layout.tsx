import { Stack } from "expo-router";

export default function CharactersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Characters",
        }}
      />
      <Stack.Screen
        name="character/[id]"
        options={{
          title: "Character", //TODO: Add character name
        }}
      />
    </Stack>
  );
}
