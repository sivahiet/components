import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './CheckBox';
import { axe } from 'jest-axe';

describe('Checkbox', () => {
  it('renders correctly with a label', () => {
    render(<Checkbox label="My Checkbox" />);
    const checkbox = screen.getByLabelText('My Checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="My Checkbox" />);
    const checkbox = screen.getByLabelText('My Checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('can be checked', () => {
    render(<Checkbox label="My Checkbox" defaultChecked />);
    const checkbox = screen.getByLabelText('My Checkbox');
    expect(checkbox).toBeChecked();
  });

  it('toggles state on click', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="My Checkbox" onChange={handleChange} />);
    const checkbox = screen.getByLabelText('My Checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Checkbox label="My Checkbox" disabled />);
    const checkbox = screen.getByLabelText('My Checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('handles the indeterminate state', () => {
    render(<Checkbox label="My Checkbox" indeterminate />);
    const checkbox = screen.getByLabelText('My Checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accessible Checkbox" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});