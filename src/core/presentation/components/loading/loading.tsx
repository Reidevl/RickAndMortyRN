import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
// Hooks
import { useThemeColor } from "@hooks/useThemeColor";

interface LoadingProps {
  size?: "small" | "large";
}

export const Loading: React.FC<LoadingProps> = ({ size = "large" }) => {
  const color = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
