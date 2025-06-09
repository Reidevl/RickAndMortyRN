import { Link } from "expo-router";
import React from "react";
import { FlatList, Platform, Pressable } from "react-native";
// Entities
import { Episode } from "@entities/Episode";
// Components
import { Paginator } from "@components/paginator";
import { EpisodeRow } from "../episodes-row";
// Styles
import { styles } from "./styles";

interface Props {
  episodes: Episode[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const EpisodeList = ({
  episodes,
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <FlatList
      data={episodes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/episode/[id]",
            params: { id: item.id },
          }}
          asChild
        >
          <Pressable style={styles.innerContainer}>
            <EpisodeRow episode={item} />
          </Pressable>
        </Link>
      )}
      ListFooterComponent={() => (
        <Paginator
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
      contentContainerStyle={styles.container}
      ListFooterComponentStyle={
        Platform.OS === "ios" ? styles.ios : styles.android
      }
      showsVerticalScrollIndicator={false}
    />
  );
};
