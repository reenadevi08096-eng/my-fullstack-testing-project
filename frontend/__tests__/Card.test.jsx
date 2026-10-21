import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

test('renders Card title and content correctly', () => {
  render(<Card title="Test Title" content="Test Description" />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});