import React from "react";
import { Pressable } from "react-native";
// Hooks
import { useThemeColor } from "@hooks/useThemeColor";
import useTranslation from "@hooks/useTranslation";
// Components
import { ThemedText } from "../ThemedText";
// Styles
import { styles } from "./styles";

type Sort = "normal" | "az" | "za";

interface Props {
  sort: Sort;
  setSort: (sort: Sort) => void;
}

function getNextSort(current: Sort): Sort {
  if (current === "normal") return "az";
  if (current === "az") return "za";
  return "normal";
}

export const SortingButton = ({ sort, setSort }: Props) => {
  const { t } = useTranslation();
  const textColor = useThemeColor(
    { dark: "#f3f4f6", light: "#22272e" },
    "text"
  );
  const buttonBackground = useThemeColor(
    { light: "#f3f4f6", dark: "#22272e" },
    "background"
  );

  return (
    <Pressable
      style={[styles.sortButton, { backgroundColor: buttonBackground }]}
      onPress={() => setSort(getNextSort(sort))}
    >
      <ThemedText style={[styles.sortButtonText, { color: textColor }]}>
        {sort === "normal"
          ? t("characters.sortedNormal")
          : sort === "az"
          ? t("characters.sortedAZ")
          : t("characters.sortedZA")}
      </ThemedText>
    </Pressable>
  );
};
