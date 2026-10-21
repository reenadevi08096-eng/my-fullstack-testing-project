import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input';

test('simulates click and mutates integer', () => {
  render(<Input placeholder="Enter text" />);
  const button = screen.getByText('Increment');
  fireEvent.click(button);
  expect(screen.getByTestId('counter')).toHaveTextContent('1');
});