import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { FlatList } from "react-native";
// Hooks
import { useEpisode } from "@hooks/episodes";
import { useThemeColor } from "@hooks/useThemeColor";
import useTranslation from "@hooks/useTranslation";
// Components
import { EpisodeInfo } from "@components/episodes/episode-info";
import {
  CharacterCard,
  IconSymbol,
  Loading,
  NotFoundSearchResult,
} from "@components/index";

export default function EpisodePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const { t } = useTranslation();
  const { episode, loading, error } = useEpisode(id);

  const iconColor = useThemeColor({}, "text");

  useLayoutEffect(() => {
    if (episode?.name) {
      navigation.setOptions({ title: episode.name });
    }
  }, [episode, navigation]);

  // Loading
  if (loading) return <Loading size="large" />;

  // Error handling
  if (error || !episode)
    return (
      <NotFoundSearchResult
        message={t("episodes.error")}
        icon={
          <IconSymbol
            name="person.crop.circle.badge.xmark"
            size={48}
            color={iconColor}
          />
        }
      />
    );

  return (
    <FlatList
      data={episode.characters}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
      renderItem={({ item }) => (
        <CharacterCard
          name={item.name}
          image={item.image}
          species={item.species}
        />
      )}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={<EpisodeInfo episode={episode} />}
    />
  );
}
