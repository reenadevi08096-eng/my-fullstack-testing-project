import { render, screen, waitFor } from '@testing-library/react';
import FetchComponent from '../components/FetchComponent';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Mocked API Response' }),
  })
);

test('mocks network fetch without active connectivity', async () => {
  render(<FetchComponent />);
  await waitFor(() => {
    expect(screen.getByText('Mocked API Response')).toBeInTheDocument();
  });
});