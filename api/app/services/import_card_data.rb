class ImportCardData
  CARD_DATA_DIR = "card_data"

  def self.call
    old_logger = ActiveRecord::Base.logger
    ActiveRecord::Base.logger = nil

    Dir["#{CARD_DATA_DIR}/**.json"].each do |filename|
      import_file(filename)
    end

    ActiveRecord::Base.logger = old_logger
  end

  private

  def self.import_file(filename)
    file_data = File.read(filename)
    data = JSON.parse(file_data)
    insert_data = data.map { |card_data| process_card(card_data) }
    Card.insert_all(insert_data)
  end

  def self.process_card(card_data)
    {
      scryfall_id: card_data["id"],
      tcgplayer_id: card_data["tcgplayer_id"],
      mana_cost: card_data["mana_cost"],
      name: card_data["name"],
      type_line: card_data["type_line"],
      oracle_text: card_data["oracle_text"],
      set_code: card_data["set"],
      artist: card_data["artist"],
      image_url: card_data.dig("image_uris", "png")
    }
  end
end
