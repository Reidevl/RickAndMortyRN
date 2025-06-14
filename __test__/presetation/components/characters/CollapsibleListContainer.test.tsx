import { render } from '@testing-library/react-native';
import React from 'react';

import { episodeMock3, episodeMock4 } from '@/__test__/mocks/Episodes/Episodes.mock';
import { CollapsibleListContainer } from '@components/characters/collapsible-list/CollapsibleListContainer';
import { Episode } from '@entities/Character';

// Mock del hook useTranslation
jest.mock('@hooks/useTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      if (key === 'episodes.title') return 'Episodes';
      return key;
    },
  }),
}));

// Mock del componente Collapsible para no renderizar internals complejos
jest.mock('@components/Collapsible', () => ({
  Collapsible: ({ title, children }: any) => (
    <>{`Collapsible: ${title}`} {children}</>
  ),
}));

// Mock del ThemedText para simplificar salida (opcional)
jest.mock('@components/ThemedText', () => ({
  ThemedText: ({ children }: any) => <>{children}</>,
}));

describe('CollapsibleListContainer', () => {
  const episodeList: Record<string, Episode[]> = {
    'Season 1': [ episodeMock3, episodeMock4],
  };

  it('should renders the component', () => {
    const { getByTestId } = render(<CollapsibleListContainer episodesBySeason={episodeList} />);
    expect(getByTestId('episodes-section')).toBeTruthy();
  });
});
