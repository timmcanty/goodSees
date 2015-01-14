Rails.application.routes.draw do
  root to: 'static_pages#index'

  resources :users, only: [:create, :new, :show, :edit, :update, :index] do
    resources :films, only: [:index]
  end

  resource :session, only: [:create, :new, :destroy]
  resources :reels, only: [:create, :index, :destroy]

  resources :films, only: [:show, :index, :new, :create, :edit, :update, :destroy] do
    resources :ratings, only: [:create, :new]
  end

  resources :ratings, only: [:edit, :update]

  namespace :api, defaults: { format: :json } do
    resources :reels
    resources :films
    resources :ratings
    resources :users
    get "search", to: "searches#index"
  end
end
