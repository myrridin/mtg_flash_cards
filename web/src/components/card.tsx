import React from "react"

export default class Card extends React.Component<{ id: any }, { card: any }> {
    componentDidMount() {
        this.fetchCard();
    }

    render() {
        return (
            <div>
                <p>Card: {this.state?.card?.name}</p>
                <img src={this.state?.card?.image_url} />
            </div>
        );
    }

    fetchCard() {
        if(this.props.id == null) {
            return;
        }

        let apiUrl:string;
        if (process.env.NODE_ENV === 'production') {
            apiUrl = "http://mtgflashcards.com/cards/"
        }
        else {
            apiUrl = "http://localhost:3000/cards/"
        }

        apiUrl = apiUrl + this.props.id

        fetch(apiUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({card: response})
            })
            .catch(err => {
                console.log(err)
                console.log("Tried to fetch " + apiUrl)
            });
    }
}