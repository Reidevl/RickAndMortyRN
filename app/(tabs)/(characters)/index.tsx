import React from "react";
import { View } from "react-native";
// Hooks
import { useCharacters } from "@hooks/characters";
import { useThemeColor } from "@hooks/useThemeColor";
import useTranslation from "@hooks/useTranslation";
// Components
import {
  CharacterList,
  IconSymbol,
  Loading,
  NotFoundSearchResult,
  SearchInput,
  Selector,
  SortingButton,
  ThemedView,
} from "@components/index";
// Constants
import {
  getGenderOptions,
  getSpeciesOptions,
  getStatusOptions,
} from "@constants/CharacterFilters";
// Styles
import { styles } from "@styles/characters/styles";

export default function CharactersScreen() {
  const {
    characters,
    filters,
    loading,
    sort,
    setName,
    setStatus,
    setSpecies,
    setGender,
    setPage,
    setSort,
    totalPages,
  } = useCharacters();
  const { name, status, species, gender } = filters;
  const { t } = useTranslation();
  const iconColor = useThemeColor({}, "text");

  const statusOptions = getStatusOptions(t);
  const speciesOptions = getSpeciesOptions(t);
  const genderOptions = getGenderOptions(t);

  return (
    <ThemedView style={styles.container}>
      <SearchInput
        value={name || ""}
        onChangeText={setName}
        onSubmit={setName}
        placeholder={t("characters.search")}
      />
      <View style={styles.filtersRow}>
        <SortingButton sort={sort} setSort={setSort} />
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
        <CharacterList
          characters={characters}
          page={filters.page || 1}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </ThemedView>
  );
}
