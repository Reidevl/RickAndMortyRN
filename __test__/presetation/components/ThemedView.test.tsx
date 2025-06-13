import { render } from '@testing-library/react-native';
// Hooks
import { useColorScheme } from '@hooks/useColorScheme';
// Components
import { ThemedView } from '@components/ThemedView';

// Mock the useColorScheme hook
jest.mock('@hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

describe('ThemedView', () => {
  beforeEach(() => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
  });

  it('renders with default theme', () => {
    const { getByTestId } = render(<ThemedView testID="themed-view" />);
    const view = getByTestId('themed-view');
    expect(view).toBeTruthy();
    expect(view.props.style).toContainEqual(expect.objectContaining({ backgroundColor: expect.any(String) }));
  });

  it('renders with custom colors', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view" lightColor="#ff0000" darkColor="#00ff00" />
    );
    const view = getByTestId('themed-view');
    expect(view).toBeTruthy();
    expect(view.props.style).toContainEqual(expect.objectContaining({ backgroundColor: '#ff0000' }));
  });

  it('renders with dark theme', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { getByTestId } = render(
      <ThemedView testID="themed-view" lightColor="#ff0000" darkColor="#00ff00" />
    );
    const view = getByTestId('themed-view');
    expect(view).toBeTruthy();
    expect(view.props.style).toContainEqual(expect.objectContaining({ backgroundColor: '#00ff00' }));
  });

  it('applies custom styles', () => {
    const customStyle = { padding: 20 };
    const { getByTestId } = render(<ThemedView testID="themed-view" style={customStyle} />);
    const view = getByTestId('themed-view');
    expect(view).toBeTruthy();
    expect(view.props.style).toContainEqual(customStyle);
  });
}); 