import useTranslation from "@hooks/useTranslation";
import { Stack } from "expo-router";

export default function EpisodesLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("tabs.episodes"),
        }}
      />
      <Stack.Screen
        name="episode/[id]"
        options={{
          title: "Episode", //TODO: Add episode name
        }}
      />
    </Stack>
  );
}
