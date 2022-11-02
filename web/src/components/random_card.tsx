import React from "react"
import BuildableCard from "./buildable_card";
import CardLink from "./card_link"

const RandomCard = () => {
    const [cardId, setCardId] = React.useState(0);
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
            {
                loaded && <div><BuildableCard id={cardId} /><CardLink cardId={cardId} /></div>
            }
        </div>
    );
}

export default RandomCard