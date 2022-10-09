class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.uuid :scryfall_id
      t.string :mana_cost
      t.string :name
      t.string :type_line
      t.string :oracle_text
      t.string :set_code
      t.string :artist
      t.integer :tcgplayer_id
      t.string :image_url

      t.timestamps

      t.index :scryfall_id, unique: true
    end
  end
end
