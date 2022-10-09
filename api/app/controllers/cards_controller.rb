class CardsController < ApplicationController
  def index
    @random_card = Card.order("RANDOM()").first

    render json: {
      card_count: Card.count,
      random_card_id: @random_card.id
    }
  end

  def show
    @card = Card.find(params[:id])
    render json: @card
  end
end
