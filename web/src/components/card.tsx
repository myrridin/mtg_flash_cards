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

        let api_url = "http://localhost:3000/cards/" + this.props.id

        fetch(api_url)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({card: response})
            })
            .catch(err => {
                console.log(err)
                console.log("Tried to fetch " + api_url)
            });
    }
}