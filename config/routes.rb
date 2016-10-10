Rails.application.routes.draw do
  scope "(/:locale)", locale: /en|fr/ do
  end

  get "/:locale", to: "home#index", as: :locale_root
  root "home#index"
end
