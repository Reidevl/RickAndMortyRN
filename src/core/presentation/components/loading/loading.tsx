import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
// Hooks
import { useThemeColor } from "@hooks/useThemeColor";

interface Props {
  size?: "small" | "large";
}

export const Loading = ({ size = "large" }: Props) => {
  const color = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
