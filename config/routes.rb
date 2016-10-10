Rails.application.routes.draw do
  scope "(/:locale)", locale: /en|fr/ do
    get "/countries", to: "countries#index"
  end

  get "/:locale", to: "home#index", as: :locale_root
  root "home#index"
end
