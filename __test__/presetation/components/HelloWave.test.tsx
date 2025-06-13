import { HelloWave } from '@components/HelloWave';
import { render } from '@testing-library/react-native';

describe('HelloWave', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders wave emoji', () => {
    const { getByText } = render(<HelloWave />);
    expect(getByText('👋')).toBeTruthy();
  });
}); 