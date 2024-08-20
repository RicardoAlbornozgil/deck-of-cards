import shuffleDeck from './ShuffleDeck';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      success: true,
      remaining: 52,
    }),
  })
);

describe('shuffleDeck', () => {
  it('should shuffle the deck and reset the cards and remaining count', async () => {
    const mockSetCards = jest.fn();
    const mockSetRemaining = jest.fn();
    
    const deckId = "newdeck123"; // Mock deck ID
    
    await shuffleDeck(deckId, mockSetCards, mockSetRemaining);
    
    expect(fetch).toHaveBeenCalledWith(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    expect(mockSetCards).toHaveBeenCalledWith([]);
    expect(mockSetRemaining).toHaveBeenCalledWith(52);
  });

  it('should not call shuffle if deckId is not provided', async () => {
    const mockSetCards = jest.fn();
    const mockSetRemaining = jest.fn();
    
    await shuffleDeck(null, mockSetCards, mockSetRemaining);
    
    expect(fetch).not.toHaveBeenCalled();
    expect(mockSetCards).not.toHaveBeenCalled();
    expect(mockSetRemaining).not.toHaveBeenCalled();
  });
});
