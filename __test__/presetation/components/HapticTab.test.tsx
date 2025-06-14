import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
// Components
import { HapticTab } from '@components/HapticTab';

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
    children: <></>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.EXPO_OS = 'ios';
  });

  function renderWithNavigation(props = defaultProps) {
    return render(
      <NavigationContainer>
        <HapticTab {...props} />
      </NavigationContainer>
    );
  }

  it('should render correctly', () => {
    const { getByTestId } = renderWithNavigation();
    const tab = getByTestId('haptic-tab');
    expect(tab).toBeTruthy();
  });

  it('should trigger haptic feedback on iOS', () => {
    const { getByTestId } = renderWithNavigation();
    const tab = getByTestId('haptic-tab');
    
    fireEvent(tab, 'pressIn');
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    expect(mockOnPressIn).toHaveBeenCalled();
  });
});
