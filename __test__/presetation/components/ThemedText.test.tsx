import { render } from '@testing-library/react-native';
// Hooks
import { useColorScheme } from '@hooks/useColorScheme';
// Components
import { ThemedText } from '@components/ThemedText';

// Mock the useColorScheme hook
jest.mock('@hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

describe('ThemedText', () => {
  beforeEach(() => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
  });

  it('renders with default type', () => {
    const { getByText } = render(<ThemedText>Test Text</ThemedText>);
    const text = getByText('Test Text');
    expect(text).toBeTruthy();
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontSize: 16, lineHeight: 24 }));
  });

  it('renders with title type', () => {
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    const text = getByText('Title Text');
    expect(text).toBeTruthy();
    expect(text.props.style).toContainEqual(
      expect.objectContaining({ fontSize: 32, fontWeight: 'bold', lineHeight: 32 })
    );
  });

  it('renders with custom colors', () => {
    const { getByText } = render(
      <ThemedText lightColor="#ff0000" darkColor="#00ff00">
        Colored Text
      </ThemedText>
    );
    const text = getByText('Colored Text');
    expect(text).toBeTruthy();
    expect(text.props.style).toContainEqual(expect.objectContaining({ color: '#ff0000' }));
  });

  it('renders with dark theme', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { getByText } = render(
      <ThemedText lightColor="#ff0000" darkColor="#00ff00">
        Dark Theme Text
      </ThemedText>
    );
    const text = getByText('Dark Theme Text');
    expect(text).toBeTruthy();
    expect(text.props.style).toContainEqual(expect.objectContaining({ color: '#00ff00' }));
  });

  it('renders with link type', () => {
    const { getByText } = render(<ThemedText type="link">Link Text</ThemedText>);
    const text = getByText('Link Text');
    expect(text).toBeTruthy();
    expect(text.props.style).toContainEqual(
      expect.objectContaining({ lineHeight: 30, fontSize: 16, color: '#0a7ea4' })
    );
  });
}); 