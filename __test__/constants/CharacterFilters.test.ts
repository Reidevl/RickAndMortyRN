import {
    getGenderOptions,
    getSortedNames,
    getSpeciesOptions,
    getStatusOptions,
} from "@/src/shared/constants/CharacterFilters";

const mockT = (key: string) => `t(${key})`;

describe("Filter Options Helpers", () => {
  it("getStatusOptions returns correct options", () => {
    const result = getStatusOptions(mockT);

    expect(result).toEqual([
      { label: "t(filters.status.all)", value: "All" },
      { label: "t(filters.status.alive)", value: "Alive" },
      { label: "t(filters.status.dead)", value: "Dead" },
      { label: "t(filters.status.unknown)", value: "unknown" },
    ]);
  });

  it("getSpeciesOptions returns correct options", () => {
    const result = getSpeciesOptions(mockT);

    expect(result).toEqual([
      { label: "t(filters.species.all)", value: "All" },
      { label: "t(filters.species.human)", value: "Human" },
      { label: "t(filters.species.alien)", value: "Alien" },
      { label: "t(filters.species.robot)", value: "Robot" },
      { label: "t(filters.species.unknown)", value: "unknown" },
    ]);
  });

  it("getGenderOptions returns correct options", () => {
    const result = getGenderOptions(mockT);

    expect(result).toEqual([
      { label: "t(filters.gender.all)", value: "All" },
      { label: "t(filters.gender.female)", value: "Female" },
      { label: "t(filters.gender.male)", value: "Male" },
      { label: "t(filters.gender.genderless)", value: "Genderless" },
      { label: "t(filters.gender.unknown)", value: "unknown" },
    ]);
  });

  it("getSortedNames returns correct options", () => {
    const result = getSortedNames(mockT);

    expect(result).toEqual([
      { label: "t(filters.sorted.az)", value: "az" },
      { label: "t(filters.sorted.za)", value: "za" },
    ]);
  });
});
