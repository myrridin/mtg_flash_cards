import React from "react"
import Card from "./card"

export default function RandomCard() {
    const [cardId, setCardId] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(
        () => {
            let api_url = "http://localhost:3000/cards/"

            const getCardId = async () => {
                console.log("FETCHING RANDOM CARD");
                const response = await fetch(api_url)
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