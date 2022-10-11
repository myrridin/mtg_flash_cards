import React from "react"
import Card from "./card"

export default function RandomCard() {
    const [cardId, setCardId] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(
        () => {
            let apiUrl:string;
            if (process.env.NODE_ENV === 'production') {
                apiUrl = "http://mtgflashcards.com/cards/"
            }
            else {
                apiUrl = "http://localhost:3000/cards/"
            }

            const getCardId = async () => {
                console.log("FETCHING RANDOM CARD");
                const response = await fetch(apiUrl)
                const data = await response.json();
                console.log(data);
                setCardId(data.random_card_id);
                setLoaded(true);
            };
            getCardId();
        }, []);

    return(
        <div>
            {loaded && <Card id={cardId} />}
        </div>
    );
}