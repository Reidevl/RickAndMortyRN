import React from "react";
import { View } from "react-native";
import { ThemedText } from "../../ThemedText";
import { styles } from "./styles";

interface Props {
  message?: string;
  icon: React.ReactNode;
}

export const NotFoundSearchResult = ({
  message = "No characters found.",
  icon,
}: Props) => {
  return (
    <View style={styles.container}>
      {icon}
      <ThemedText type="subtitle" style={styles.text}>
        {message}
      </ThemedText>
    </View>
  );
};

