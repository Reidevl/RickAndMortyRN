import React from "react";
import { View } from "react-native";
// Hooks
import useTranslation from "@hooks/useTranslation";
// Entities
import { Episode } from "@entities/Episode";
// Components
import { ThemedText } from "@components/ThemedText";
import { IconSymbol } from "@components/ui/IconSymbol";
import { styles } from "./styles";

interface Props {
  episode: Episode;
}

export const EpisodeInfo = ({ episode }: Props) => {
  const { t } = useTranslation();
  return (
    <View testID="episode-info">
      <ThemedText type="title" style={styles.title}>
        {episode.name}
      </ThemedText>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <IconSymbol
            name="calendar"
            size={20}
            color="#888"
            style={styles.infoIcon}
          />
          <ThemedText type="default" style={styles.airDate}>
            <ThemedText type="defaultSemiBold">
              {t("episodes.airDate")}{" "}
            </ThemedText>
            {episode.air_date}
          </ThemedText>
        </View>
        <View style={styles.infoRow}>
          <IconSymbol
            name="list.bullet"
            size={20}
            color="#888"
            style={styles.infoIcon}
          />
          <ThemedText type="default" style={styles.episodeCode}>
            <ThemedText type="defaultSemiBold">
              {t("episodes.episodeCode")}:{" "}
            </ThemedText>
            {episode.episode}
          </ThemedText>
        </View>
      </View>

      <ThemedText type="subtitle" style={styles.episodeCharacters}>
        {t("episodes.episodeCharacters")}
      </ThemedText>
    </View>
  );
};
