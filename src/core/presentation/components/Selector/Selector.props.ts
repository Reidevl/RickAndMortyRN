// Types
export type SelectorOption<T extends string> = {
  label: string;
  value: T;
};

export interface SelectorProps<T extends string> {
  label: string;
  value: T;
  options: SelectorOption<T>[];
  onSelect: (value: T) => void;
}
