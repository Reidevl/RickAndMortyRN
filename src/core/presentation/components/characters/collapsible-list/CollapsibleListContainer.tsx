import React from "react";
import { View } from "react-native";
// Hooks
import useTranslation from "@hooks/useTranslation";
// Components
import { Collapsible } from "@components/Collapsible";
import { ThemedText } from "@components/ThemedText";
// Entities
import { Episode } from "@entities/Character";
// Styles
import { styles } from "./styles";

interface Props {
  episodesBySeason: Record<string, Episode[]>;
}

export const CollapsibleListContainer = ({ episodesBySeason }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.episodesSection}>
      <ThemedText type="subtitle" style={styles.episodesTitle}>
        {t("episodes.title")}
      </ThemedText>
      {Object.entries(episodesBySeason).map(([season, episodes]) => (
        <View key={season} style={styles.episodesSectionCollapsible}>
          <Collapsible key={season} title={season}>
            {episodes.map((ep) => (
              <ThemedText key={ep.id} style={styles.episodeItem}>
                {ep.episode} - {ep.name}
              </ThemedText>
            ))}
          </Collapsible>
        </View>
      ))}
    </View>
  );
};
