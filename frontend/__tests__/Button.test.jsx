import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

test('renders Button without crashing and shows label prop', () => {
  render(<Button label="Click Me" />);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});