import React from "react";
import { FlatList, View } from "react-native";
// Hooks
import { useCharacters } from "@hooks/characters";
import { useThemeColor } from "@hooks/useThemeColor";
import useTranslation from "@hooks/useTranslation";
// Components
import {
  CharacterCard,
  IconSymbol,
  Loading,
  NotFoundSearchResult,
  SearchInput,
  Selector,
  ThemedView,
} from "@components/index";
// Styles
import { styles } from "./styles";

export default function CharactersScreen() {
  const {
    characters,
    filters,
    loading,
    setName,
    setStatus,
    setSpecies,
    setGender,
    setPage,
  } = useCharacters();
  const { name, status, species, gender } = filters;
  const { t } = useTranslation();
  const iconColor = useThemeColor({}, "text");

  const statusOptions = [
    { label: t("filters.status.all"), value: "All" },
    { label: t("filters.status.alive"), value: "Alive" },
    { label: t("filters.status.dead"), value: "Dead" },
    { label: t("filters.status.unknown"), value: "unknown" },
  ];

  const speciesOptions = [
    { label: t("filters.species.all"), value: "All" },
    { label: t("filters.species.human"), value: "Human" },
    { label: t("filters.species.alien"), value: "Alien" },
    { label: t("filters.species.robot"), value: "Robot" },
    { label: t("filters.species.unknown"), value: "unknown" },
  ];
  const genderOptions = [
    { label: t("filters.gender.all"), value: "All" },
    { label: t("filters.gender.female"), value: "Female" },
    { label: t("filters.gender.male"), value: "Male" },
    { label: t("filters.gender.genderless"), value: "Genderless" },
    { label: t("filters.gender.unknown"), value: "unknown" },
  ];

  return (
    <ThemedView style={styles.container}>
      <SearchInput
        value={name || ""}
        onChangeText={setName}
        onSubmit={setName}
        placeholder={t("characters.search")}
      />
      <View style={styles.filtersRow}>
        <Selector
          label={t("characters.status")}
          value={status || ""}
          options={statusOptions}
          onSelect={setStatus}
        />
        <Selector
          label={t("characters.species")}
          value={species || ""}
          options={speciesOptions}
          onSelect={setSpecies}
        />
        <Selector
          label={t("characters.gender")}
          value={gender || ""}
          options={genderOptions}
          onSelect={setGender}
        />
      </View>
      {/* Loading */}
      {loading ? (
        <Loading size="large" />
      ) : characters.length === 0 ? (
        // No characters found
        <NotFoundSearchResult
          message={t("characters.noCharactersFound")}
          icon={
            <IconSymbol
              name="person.crop.circle.badge.xmark"
              size={48}
              color={iconColor}
            />
          }
        />
      ) : (
        // Character list
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
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}
