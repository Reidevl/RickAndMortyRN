import React from "react";
import { Text, View, ViewProps } from "react-native";
// Data
import { Character } from "@/src/core/domain/entities/Character";
// Hooks
import useTranslation from "@hooks/useTranslation";
// Components
import { ThemedText } from "@components/ThemedText";
import { IconSymbol } from "@components/ui/IconSymbol";
// Styles
import { getStatusColor } from "@utils/index";
import { styles } from "./styles";

interface Props extends ViewProps {
  character: Character;
}

export const CharacterInfo = ({ character, ...props }: Props) => {
  const { t } = useTranslation();
  return (
    <View testID="character-info" style={styles.container} {...props}>
      <ThemedText type="title" style={styles.name}>
        {character.name}
      </ThemedText>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
        <IconSymbol name="person.2" size={20} color={getStatusColor(character.status)} style={{ marginRight: 8 }} />
        <ThemedText>
          <Text style={styles.label}>{t("characters.status")}: </Text>
          <Text style={{ color: getStatusColor(character.status) }}>●</Text> {character.status}
        </ThemedText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
        <IconSymbol name="list.bullet" size={20} color="#888" style={{ marginRight: 8 }} />
        <ThemedText>
          <Text style={styles.label}>{t("characters.species")}: </Text>
          {character.species}
        </ThemedText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
        <IconSymbol name="person.2" size={20} color="#888" style={{ marginRight: 8 }} />
        <ThemedText>
          <Text style={styles.label}>{t("characters.gender")}: </Text>
          {character.gender}
        </ThemedText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
        <IconSymbol name="location" size={20} color="#888" style={{ marginRight: 8 }} />
        <ThemedText>
          <Text style={styles.label}>{t("characters.location")}: </Text>
          {character.location?.name}
        </ThemedText>
      </View>
    </View>
  );
};
