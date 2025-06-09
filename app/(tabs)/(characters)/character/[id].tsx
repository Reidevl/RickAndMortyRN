import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Image, StyleSheet } from "react-native";
// Hooks
import { useCharacter } from "@hooks/characters/useCharacter.hook";
import { useThemeColor } from "@hooks/useThemeColor";
import useTranslation from "@hooks/useTranslation";
// Components
import {
  CharacterInfo,
  CollapsibleListContainer,
  IconSymbol,
  Loading,
  NotFoundSearchResult,
  ParallaxScrollView
} from "@components/index";

export default function CharacterPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const { t } = useTranslation();
  const iconColor = useThemeColor({}, "text");
  const { character, episodesBySeason, loading, error } = useCharacter(id);

  useLayoutEffect(() => {
    if (character?.name) {
      navigation.setOptions({ title: character.name });
    }
  }, [character, navigation]);

  // Loading
  if (loading) return <Loading size="large" />;

  // Error handling
  if (error || !character)
    return (
      <NotFoundSearchResult
        message={t("characters.characterError")}
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
    <ParallaxScrollView
      headerImage={
        <Image
          source={{ uri: character.image }}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
      headerBackgroundColor={{ light: "#e5e7eb", dark: "#22272e" }}
    >
      {/* Character info */}
      <CharacterInfo character={character} />
      {/* Episodes */}
      <CollapsibleListContainer episodesBySeason={episodesBySeason} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 300,
  },
});
