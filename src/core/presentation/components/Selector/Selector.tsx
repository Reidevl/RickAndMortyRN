import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
// Hooks
import { useThemeColor } from "@hooks/useThemeColor";
// Styles
import { styles } from "./styles";
// Props
import { SelectorProps } from "./Selector.props";

export function Selector<T extends string>({
  label,
  value,
  options,
  onSelect,
}: SelectorProps<T>) {
  const [visible, setVisible] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label || label,
    [options, value, label]
  );

  const handleSelect = (item: T) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Text style={[styles.label, { color: textColor }]}>
          {selectedLabel}
        </Text>
        <Feather name="chevron-down" size={18} color={textColor} />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType={Platform.OS === "ios" ? "slide" : "fade"}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={
            Platform.OS === "ios" ? styles.iosOverlay : styles.androidOverlay
          }
          onPress={() => setVisible(false)}
        >
          <SafeAreaView
            style={[
              Platform.OS === "ios" ? styles.iosModal : styles.androidModal,
              { backgroundColor },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                >
                  <Text style={[styles.optionText, { color: textColor }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  );
}
