import { render } from '@testing-library/react';
import Card from './Card';

test('renders a card image', () => {
  const { getByAltText } = render(<Card image="https://deckofcardsapi.com/static/img/AS.png" />);
  const imgElement = getByAltText(/card/i);
  expect(imgElement).toHaveAttribute('src', 'https://deckofcardsapi.com/static/img/AS.png');
});
