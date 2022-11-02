import React from "react"

export default class BuildableCard extends React.Component<{ id: any }, { card: any }> {
    componentDidMount() {
        this.fetchCard();
    }

    render() {
        return (
            <div className='buildable-card'>
                <div className='buildable-card-title'>{this.state?.card?.name}</div>
                <div className='buildable-card-set-code'>{this.state?.card?.set_code}</div>
                <div className='buildable-card-mana-cost' dangerouslySetInnerHTML={{__html: this.manaCost()}}/>
                <div className='buildable-card-type-line'>{this.state?.card?.type_line}</div>
                <div className='buildable-card-oracle-text' dangerouslySetInnerHTML={{__html: this.oracleText()}}/>
                <div className='buildable-card-artist'>Artist: {this.state?.card?.artist}</div>
                <p>Card: {this.state?.card?.name}</p>
            </div>
        );
    }

    manaCost() {
        return this.symbolReplace(this.state?.card?.mana_cost)
    }

    oracleText() {
        return this.symbolReplace(this.state?.card?.oracle_text)
    }

    symbolReplace(text:string) {
        return text?.replace(/{(\w)}/g, (match, p1) => "<i class=\"ms ms-" + p1.toLowerCase() + "\"></i>")
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