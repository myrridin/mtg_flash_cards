class ImportCardData
  CARD_DATA_DIR = "card_data"
  SCRYFALL_BULK_DATA_URI = "https://api.scryfall.com/bulk-data"

  def self.call
    process_data(all_card_data)
  end

  private

  def self.process_data(all_card_data)
    insert_data = all_card_data.map { |card_data| process_card(card_data) }

    Rails.logger.info { "Inserting Cards" }
    old_logger = ActiveRecord::Base.logger
    ActiveRecord::Base.logger = nil

    Card.insert_all(insert_data)

    ActiveRecord::Base.logger = old_logger
    Rails.logger.info { "Done inserting Cards" }
  end

  def self.card_data_uri
    @card_data_uri ||= get_card_data_uri
  end

  def self.get_card_data_uri
    Rails.logger.info { "Getting card data URI" }
    bulk_data_files = FastJsonparser.parse(RestClient.get(SCRYFALL_BULK_DATA_URI))
    file_uri_hash = bulk_data_files[:data].find { |h| h[:type] == "default_cards" }
    Rails.logger.info { "Got card data URI #{file_uri_hash[:download_uri]}" }
    file_uri_hash[:download_uri]
  end

  def self.all_card_data
    Rails.logger.info { "Getting card data" }
    file_data_json = Net::HTTP.get(URI.parse(card_data_uri))
    Rails.logger.info { "Got card data" }
    FastJsonparser.parse(file_data_json)
  end

  def self.process_card(card_data)
    {
      scryfall_id: card_data[:id],
      tcgplayer_id: card_data[:tcgplayer_id],
      mana_cost: card_data[:mana_cost],
      name: card_data[:name],
      type_line: card_data[:type_line],
      oracle_text: card_data[:oracle_text],
      set_code: card_data[:set],
      artist: card_data[:artist],
      image_url: card_data.dig(:image_uris, :large)
    }
  end
end
