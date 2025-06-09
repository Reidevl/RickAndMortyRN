import React from "react";
import { View } from "react-native";
// Hooks
import { useThemeColor } from "@hooks/useThemeColor";
// Entities
import { Episode } from "@entities/Episode";
// Components
import { ThemedText } from "@components/ThemedText";
import { IconSymbol } from "@components/ui";
// Styles
import { styles } from "./styles";

interface Props {
  episode: Episode;
}

export const EpisodeRow = ({ episode }: Props) => {
  const backgroundColor = useThemeColor(
    { light: "#f3f4f6", dark: "#22272e" },
    "background"
  );

  const borderColor = useThemeColor(
    { dark: "#f3f4f6", light: "#22272e" },
    "text"
  );
  const textColor = useThemeColor(
    { dark: "#f3f4f6", light: "#22272e" },
    "text"
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <ThemedText type="subtitle" style={[styles.code, { color: textColor }]}>
          Episode {episode.episode}
        </ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={[styles.name, { color: textColor }]}
        >
          {episode.name}
        </ThemedText>
        <ThemedText
          type="default"
          style={[styles.airDate, { color: textColor }]}
        >
          Aired on {episode.air_date || "Unknown"}
        </ThemedText>
      </View>
      <IconSymbol name="chevron.right" size={28} color={textColor} />
    </View>
  );
};
