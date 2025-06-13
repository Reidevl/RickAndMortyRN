import { useColorScheme } from '@hooks/useColorScheme';
import { fireEvent, render } from '@testing-library/react-native';

import { Collapsible } from '@/src/core/presentation/components/Collapsible';

// Mock the useColorScheme hook
jest.mock('@hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

// Mock IconSymbol component
jest.mock('@/src/core/presentation/components/ui/IconSymbol', () => ({
  IconSymbol: jest.fn(({ style }) => <div data-testid="icon-symbol" style={style} />),
}));

describe('Collapsible', () => {
  beforeEach(() => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
  });

  it('renders with title', () => {
    const { getByText } = render(<Collapsible title="Test Title">Content</Collapsible>);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('starts collapsed', () => {
    const { queryByText } = render(<Collapsible title="Test Title">Content</Collapsible>);
    expect(queryByText('Content')).toBeNull();
  });

  it('expands when clicked', () => {
    const { getByText, queryByText } = render(<Collapsible title="Test Title">Content</Collapsible>);
    
    // Initially collapsed
    expect(queryByText('Content')).toBeNull();
    
    // Click to expand
    fireEvent.press(getByText('Test Title'));
    
    // Should show content
    expect(queryByText('Content')).toBeTruthy();
  });

  it('collapses when clicked again', () => {
    const { getByText, queryByText } = render(<Collapsible title="Test Title">Content</Collapsible>);
    
    // Expand first
    fireEvent.press(getByText('Test Title'));
    expect(queryByText('Content')).toBeTruthy();
    
    // Collapse
    fireEvent.press(getByText('Test Title'));
    expect(queryByText('Content')).toBeNull();
  });

  it('rotates icon when expanded', () => {
    const { getByText, getByTestId } = render(<Collapsible title="Test Title">Content</Collapsible>);
    
    // Initially not rotated
    const icon = getByTestId('icon-symbol');
    expect(icon.props.style.transform).toEqual([{ rotate: '0deg' }]);
    
    // Click to expand
    fireEvent.press(getByText('Test Title'));
    
    // Should be rotated
    expect(icon.props.style.transform).toEqual([{ rotate: '90deg' }]);
  });
}); 