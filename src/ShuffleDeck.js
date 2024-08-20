const shuffleDeck = async (deckId, setCards, setRemaining) => {
    if (!deckId) {
        console.error("Invalid deckId provided to shuffleDeck");
        return;
    }

    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        if (!response.ok) {
            throw new Error("Failed to shuffle the deck");
        }
        setCards([]);
        setRemaining(52);
    } catch (error) {
        console.error("Error shuffling the deck:", error);
    }
};

export default shuffleDeck;
