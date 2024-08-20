import React, { useState, useEffect, useRef } from 'react';
import shuffleDeck from './ShuffleDeck'; // Import the shuffleDeck function
import './Deck.css'; // Import the CSS

function Deck() {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [remaining, setRemaining] = useState(52);
    const [isAutoDrawing, setIsAutoDrawing] = useState(false);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
                const data = await response.json();
                setDeck(data);
            } catch (error) {
                console.error("Error fetching the deck:", error);
            }
        };
        fetchDeck();
    }, []);

    const drawCard = async () => {
        if (remaining === 0) {
            alert("Error: no cards remaining!");
            return;
        }

        try {
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck?.deck_id}/draw/?count=1`);
            const data = await response.json();

            if (data.cards) {
                const newCard = data.cards[0];
                setCards(prevCards => [...prevCards, { ...newCard, rotate: Math.random() * 30 - 15 }]);
                setRemaining(data.remaining);
            }
        } catch (error) {
            console.error("Error drawing a card:", error);
        }
    };

    const toggleAutoDraw = () => {
        if (isAutoDrawing) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        } else {
            intervalIdRef.current = setInterval(drawCard, 1000);
        }
        setIsAutoDrawing(!isAutoDrawing);
    };

    return (
        <div className="deck-container">
            <div className="card-stack">
                {cards.map((card, index) => (
                    <img
                        key={index}
                        src={card.image}
                        alt="card"
                        className="card"
                        style={{ '--rotate': `${card.rotate}deg` }}
                    />
                ))}
            </div>
            <div className="button-container">
                <button onClick={drawCard} disabled={isAutoDrawing || !deck}>Draw Card</button>
                <button onClick={() => shuffleDeck(deck?.deck_id, setCards, setRemaining)} disabled={!deck}>
                    Shuffle Deck
                </button>
                <button onClick={toggleAutoDraw}>
                    {isAutoDrawing ? 'Stop Auto Draw' : 'Start Auto Draw'}
                </button>
            </div>
        </div>
    );
}

export default Deck;
