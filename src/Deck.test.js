import { render, fireEvent } from '@testing-library/react';
import Deck from './Deck';

test('shuffles the deck when shuffle button is clicked', () => {
  const { getByText } = render(<Deck />);
  const shuffleButton = getByText(/Shuffle Deck/i);
  fireEvent.click(shuffleButton);
  
});
