import React from "react";
import { View } from "react-native";
// Hooks
import useTranslation from "@hooks/useTranslation";
// Entities
import { Episode } from "@entities/Episode";
// Components
import { ThemedText } from "@components/ThemedText";
import { styles } from "./styles";

interface Props {
  episode: Episode;
}

export const EpisodeInfo = ({ episode }: Props) => {
  const { t } = useTranslation();
  return (
    <View>
      <ThemedText type="title" style={styles.title}>
        {episode.name}
      </ThemedText>
      <ThemedText type="default" style={styles.airDate}>
        <ThemedText type="defaultSemiBold">{t("episodes.airDate")} </ThemedText>
        {episode.air_date}
      </ThemedText>
      <ThemedText type="default" style={styles.episodeCode}>
        <ThemedText type="defaultSemiBold">
          {t("episodes.episodeCode")}:{" "}
        </ThemedText>
        {episode.episode}
      </ThemedText>
      <ThemedText type="subtitle" style={styles.episodeCharacters}>
        {t("episodes.episodeCharacters")}
      </ThemedText>
    </View>
  );
};
