import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// Hooks
import { useThemeColor } from "@hooks/useThemeColor";
// Components
import { IconSymbol } from "../ui";
// Styles
import { styles } from "./styles";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Paginator = ({ page, totalPages, onPageChange }: Props) => {
  const buttonTextColor = useThemeColor(
    { dark: "#f3f4f6", light: "#22272e" },
    "text"
  );
  const textColor = useThemeColor(
    { dark: "#f3f4f6", light: "#22272e" },
    "text"
  );
  const backgroundColor = useThemeColor(
    { light: "#f3f4f6", dark: "#22272e" },
    "background"
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={() => onPageChange(1)}
        disabled={page === 1}
      >
        <IconSymbol
          name="backward.end.fill"
          size={16}
          color={buttonTextColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <IconSymbol name="chevron.left" size={16} color={buttonTextColor} />
      </TouchableOpacity>
      <Text style={[styles.pageText, { color: textColor }]}>
        {page} / {totalPages}
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <IconSymbol name="chevron.right" size={16} color={buttonTextColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        <IconSymbol name="forward.end.fill" size={16} color={buttonTextColor} />
      </TouchableOpacity>
    </View>
  );
};
