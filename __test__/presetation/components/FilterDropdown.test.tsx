import { render } from '@testing-library/react-native';
// Components
import { FilterDropdown } from '@components/FilterDropdown';

describe('FilterDropdown', () => {
  const defaultProps = {
    label: 'Test Label',
    value: 'test-value',
    options: ['option1', 'option2', 'option3'],
    onSelect: jest.fn(),
  };

  it('renders with label', () => {
    const { getByText } = render(<FilterDropdown {...defaultProps} />);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('handles different label values', () => {
    const customLabel = 'Custom Label';
    const { getByText } = render(<FilterDropdown {...defaultProps} label={customLabel} />);
    expect(getByText(customLabel)).toBeTruthy();
  });
}); 