import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props<T> {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: T) => void;
}

export const FilterDropdown = <T extends string>({ label, value, options, onSelect }: Props<T>) => {
  // For now, just show the label and value (no dropdown logic)
  return (
    <TouchableOpacity style={styles.dropdown}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: '#222',
  },
});
