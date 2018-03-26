Rails.application.routes.draw do
  devise_for :admins
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "pages#show", page: "home"
  get "/willitflood" => "pages#show", page: "willitflood"
  get "/floodform" => "floods#new"

  resources :floods

end
