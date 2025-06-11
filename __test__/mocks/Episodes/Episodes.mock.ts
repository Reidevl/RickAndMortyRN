import { Episode } from "@/src/core/domain/entities/Episode";
import { characterMock1, characterMock2 } from "../Characters/Character.mock";

export const episodeMock1: Episode = {
  id: "1",
  name: "Episode 1",
  episode: "S01E01",
  air_date: "2013-12-02",
  characters: [characterMock1, characterMock2],
  created: "2013-12-02T14:42:00.000Z",
};

export const episodeMock2: Episode = {
  id: "2",
  name: "Episode 2",
  episode: "S01E02",
  air_date: "2013-12-02",
  characters: [characterMock1, characterMock2],
  created: "2013-12-02T14:42:00.000Z",
};