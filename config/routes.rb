Rails.application.routes.draw do
  root to: 'reels#index'

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]
  resources :reels, only: [:create, :index, :destroy]
  resources :films, only: [:show] do
    resources :ratings, only: [:create, :new]
  end
end
