require 'cartowrap'
Cartowrap.configure do |config|
  config.account = ENV['CARTODB_ACCOUNT']
  config.api_key = ENV['CARTODB_KEY']
end
