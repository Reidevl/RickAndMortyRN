import useTranslation from "@hooks/useTranslation";
import { Stack } from "expo-router";

export default function CharactersLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("tabs.characters"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="character/[id]"
        options={{
          title: "",
          headerBackTitle: "",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
