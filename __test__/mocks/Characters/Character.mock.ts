import { Character } from "@/src/core/domain/entities/Character";

export const characterMock1: Character = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "Human",
  gender: "Male",
  origin: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  location: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    { id: "e1", name: "Ep1", episode: "S01E01", airDate: "2013-12-02" },
    { id: "e2", name: "Ep2", episode: "S01E02", airDate: "2013-12-02" },
  ],
  created: "2013-12-02T14:42:00.000Z",
};

export const characterMock2: Character = {
  id: "2",
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  type: "Human",
  gender: "Male",
  origin: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  location: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: [
    {
      id: "2",
      name: "Episode 2",
      episode: "S01E02",
      airDate: "2013-12-02",
    },
  ],
  created: "2013-12-02T14:42:00.000Z",
};

export const characterMock3: Character = {
  id: "3",
  name: "Charlie",
  status: "Alive",
  species: "Human",
  type: "Human",
  gender: "Male",
  origin: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  location: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  image: "",
  episode: [
    { id: "e1", name: "Ep1", episode: "S01E01", airDate: "2013-12-02" },
    { id: "e2", name: "Ep2", episode: "S01E02", airDate: "2013-12-02" },
  ],
  created: "2013-12-02T14:42:00.000Z",
};

export const characterMock4: Character = {
  id: "4",
  name: "Weird Ep",
  status: "Alive",
  species: "Human",
  type: "Human",
  gender: "Male",
  origin: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  location: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  image: "",
  episode: [
    { id: "e1", name: "Test Ep", episode: "test", airDate: "2013-12-02" },
  ],
  created: "2013-12-02T14:42:00.000Z",
};

