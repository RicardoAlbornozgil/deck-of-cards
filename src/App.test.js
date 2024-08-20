import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Deck of Cards header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Deck of Cards/i);
  expect(headerElement).toBeInTheDocument();
});
