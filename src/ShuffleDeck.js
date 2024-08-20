const shuffleDeck = async (deckId, setCards, setRemaining) => {
    if (!deckId) return; // Add a check to ensure deckId is provided

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    if (!response.ok) {
        console.error("Failed to shuffle the deck");
        return;
    }

    const data = await response.json();
    setCards([]);
    setRemaining(data.remaining);
};

export default shuffleDeck;
