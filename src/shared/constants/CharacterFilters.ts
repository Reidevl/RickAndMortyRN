export function getStatusOptions(t: (key: string) => string) {
  return [
    { label: t("filters.status.all"), value: "All" },
    { label: t("filters.status.alive"), value: "Alive" },
    { label: t("filters.status.dead"), value: "Dead" },
    { label: t("filters.status.unknown"), value: "unknown" },
  ];
}

export function getSpeciesOptions(t: (key: string) => string) {
  return [
    { label: t("filters.species.all"), value: "All" },
    { label: t("filters.species.human"), value: "Human" },
    { label: t("filters.species.alien"), value: "Alien" },
    { label: t("filters.species.robot"), value: "Robot" },
    { label: t("filters.species.unknown"), value: "unknown" },
  ];
}

export function getGenderOptions(t: (key: string) => string) {
  return [
    { label: t("filters.gender.all"), value: "All" },
    { label: t("filters.gender.female"), value: "Female" },
    { label: t("filters.gender.male"), value: "Male" },
    { label: t("filters.gender.genderless"), value: "Genderless" },
    { label: t("filters.gender.unknown"), value: "unknown" },
  ];
}

export function getSortedNames(t: (key: string) => string) {
  return [
    { label: t("filters.sorted.az"), value: "az" },
    { label: t("filters.sorted.za"), value: "za" },
  ];
}