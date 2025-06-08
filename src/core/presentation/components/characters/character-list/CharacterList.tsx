import React from "react";
import { FlatList, Platform } from "react-native";
// Components
import { Paginator } from "../../paginator/Paginator";
import { CharacterCard } from "../character-card";
// Entities
import { Character } from "@/src/core/domain/entities/Character";
// Styles
import { styles } from "./styles";

interface Props {
  characters: Character[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CharacterList = ({
  characters,
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <CharacterCard
          name={item.name}
          image={item.image}
          species={item.species}
        />
      )}
      ListFooterComponent={() => (
        <Paginator
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          />
        )
    }
      contentContainerStyle={styles.container}
      ListFooterComponentStyle={
          Platform.OS === "ios" ? styles.ios : styles.android
      }
      showsVerticalScrollIndicator={false}
    />
  );
};
