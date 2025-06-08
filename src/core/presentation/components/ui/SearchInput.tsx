import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
// Hooks
import { useThemeColor } from "@hooks/useThemeColor";
// Component
import { IconSymbol } from "./IconSymbol";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (text: string) => void;
  placeholder?: string;
  lightColor?: string;
  darkColor?: string;
}

export const SearchInput = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Search by name",
  lightColor,
  darkColor,
}: Props) => {
  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    onSubmit(e.nativeEvent.text);
  };

  // Use theme colors
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeholderColor = useThemeColor({ light: "#7B8794", dark: "#A0AEC0" }, "text");

  return (
    <View style={[styles.container, { borderColor: textColor }]}>
      <IconSymbol size={20} name="magnifyingglass" color={placeholderColor} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
});
