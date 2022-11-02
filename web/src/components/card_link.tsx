import React from "react";

type CardLinkProps = {
    cardId: number
}

const CardLink: React.FC<CardLinkProps> = ({cardId}) => {
    return (
        <div>
            <a href={"/cards/" + cardId}>Card #{cardId}</a>
        </div>
    )
}

export default CardLink