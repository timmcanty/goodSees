Rails.application.routes.draw do
  root to: 'reels#index'

  resources :users, only: [:create, :new] do
    resources :films, only: [:index]
    resources :reels do
      resources :films, only: [:index]
    end
  end
  resource :session, only: [:create, :new, :destroy]
  resources :reels, only: [:create, :index, :destroy]
  resources :films
end
