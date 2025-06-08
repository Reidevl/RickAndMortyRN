import React from "react";
import { Image, View } from "react-native";
// Components
import { ThemedText } from "@components/ThemedText";
import { Colors } from "@constants/Colors";
// Styles
import { styles } from "./styles";

interface Props {
  name: string;
  image: string;
  species: string;
}

export const CharacterCard = ({ name, image, species }: Props) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.image} />
    <ThemedText
      type="defaultSemiBold"
      lightColor={Colors.light.text}
      darkColor={Colors.dark.text}
      style={styles.text}
    >
      {name}
    </ThemedText>
    <ThemedText
      type="default"
      lightColor={Colors.light.textSecondary}
      darkColor={Colors.dark.textSecondary}
      style={styles.text}
    >
      {species}
    </ThemedText>
  </View>
);
