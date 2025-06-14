import { Tabs } from "expo-router";
import { Platform } from "react-native";
// Hooks
import { useColorScheme } from "@hooks/useColorScheme";
import useTranslation from "@hooks/useTranslation";
// Components
import { HapticTab } from "@components/HapticTab";
import { IconSymbol } from "@components/ui/IconSymbol";
// Constanst
import { Colors } from "@constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: undefined,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="(characters)"
        options={{
          title: t("tabs.characters"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.2" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(episodes)"
        options={{
          title: t("tabs.episodes"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.bullet" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
