import { CharacterStatus } from "@/src/core/domain/entities/Character";


const STATUS_COLOR_MAP: Record<CharacterStatus, string> = {
  Alive: "green",
  Dead: "red",
  unknown: "gray",
  All: "gray",
};

export function getStatusColor(status: CharacterStatus): string {
  return STATUS_COLOR_MAP[status] || "gray";
}
