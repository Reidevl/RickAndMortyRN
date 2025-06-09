import React from "react";
import { View } from "react-native";
// Hooks
import { useEpisodes } from "@hooks/episodes";
import { useThemeColor } from "@hooks/useThemeColor";
import useTranslation from "@hooks/useTranslation";
// Components
import { NotFoundSearchResult } from "@components/characters";
import { EpisodeList } from "@components/episodes/episode-list";
import { Loading } from "@components/loading";
import { ThemedView } from "@components/ThemedView";
import { IconSymbol, SearchInput } from "@components/ui";
// Styles
import { styles } from "@styles/episodes/styles";

export default function EpisodesScreen() {
  const { t } = useTranslation();
  const iconColor = useThemeColor({}, "text");
  const { episodes, loading, error, filters, setName, setPage, totalPages } =
    useEpisodes();

  return (
    <ThemedView style={styles.container}>
      <SearchInput
        value={filters.name || ""}
        onChangeText={setName}
        onSubmit={setName}
        placeholder={t("episodes.search")}
      />
      <View style={styles.filtersRow}></View>
      {loading ? (
        <Loading size="large" />
      ) : episodes.length === 0 || error ? (
        <NotFoundSearchResult
          message={t("episodes.noEpisodesFound")}
          icon={
            <IconSymbol
              name="person.crop.circle.badge.xmark"
              size={48}
              color={iconColor}
            />
          }
        />
      ) : (
        <EpisodeList
          episodes={episodes}
          page={filters.page || 1}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </ThemedView>
  );
}
