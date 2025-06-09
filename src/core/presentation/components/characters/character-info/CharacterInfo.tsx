import React from "react";
import { Text, View } from "react-native";
// Data
import { Character } from "@/src/core/domain/entities/Character";
// Hooks
import useTranslation from "@hooks/useTranslation";
// Components
import { ThemedText } from "@components/ThemedText";
// Styles
import { getStatusColor } from "@utils/index";
import { styles } from "./styles";

interface Props {
  character: Character;
}

export const CharacterInfo = ({ character }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.name}>
        {character.name}
      </ThemedText>
      <ThemedText>
        <Text style={styles.label}>{t("characters.status")}: </Text>
        <Text
          style={{
            color: getStatusColor(character.status),
          }}
        >
          ●
        </Text>{" "}
        {character.status}
      </ThemedText>
      <ThemedText>
        <Text style={styles.label}>{t("characters.species")}: </Text>
        {character.species}
      </ThemedText>
      <ThemedText>
        <Text style={styles.label}>{t("characters.gender")}: </Text>
        {character.gender}
      </ThemedText>
      <ThemedText>
        <Text style={styles.label}>{t("characters.location")}: </Text>
        {character.location?.name}
      </ThemedText>
    </View>
  );
};
