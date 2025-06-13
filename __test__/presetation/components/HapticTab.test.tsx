import { fireEvent, render } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';

import { HapticTab } from '@/src/core/presentation/components/HapticTab';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
  },
}));

describe('HapticTab', () => {
  const mockOnPressIn = jest.fn();
  const defaultProps = {
    onPressIn: mockOnPressIn,
    testID: 'haptic-tab',
    children: <div>Test Tab</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.EXPO_OS = 'ios';
  });

  it('triggers haptic feedback on iOS', () => {
    const { getByTestId } = render(<HapticTab {...defaultProps} />);
    const tab = getByTestId('haptic-tab');
    
    fireEvent.press(tab);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    expect(mockOnPressIn).toHaveBeenCalled();
  });

  it('does not trigger haptic feedback on non-iOS platforms', () => {
    process.env.EXPO_OS = 'android';
    const { getByTestId } = render(<HapticTab {...defaultProps} />);
    const tab = getByTestId('haptic-tab');
    
    fireEvent.press(tab);
    
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
    expect(mockOnPressIn).toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    const { getByTestId } = render(
      <HapticTab {...defaultProps} accessibilityLabel="Test Tab" />
    );
    const tab = getByTestId('haptic-tab');
    expect(tab.props.accessibilityLabel).toBe('Test Tab');
  });
}); 