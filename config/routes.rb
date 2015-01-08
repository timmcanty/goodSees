Rails.application.routes.draw do
  root to: 'reels#index'

  resources :users, only: [:create, :new, :show, :edit, :update, :index] do
    resources :films, only: [:index]
  end
  resource :session, only: [:create, :new, :destroy]
  resources :reels, only: [:create, :index, :destroy]
  resources :films, only: [:show, :index] do
    resources :ratings, only: [:create, :new]
  end
  resources :ratings, only: [:edit, :update]
end
