desc "Get an updated list of cards from Scryfall"
task :update_cards => :environment do
  puts "Updating cards list. Current count: #{Card.count}"
  ImportCardData.call
  puts "Update complete. New count: #{Card.count}"
end