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
    resource :session, only: [:show,:create,:destroy]
    resources :activities, only: [:index]
    resources :reels
    resources :films
    resources :ratings
    resources :users, only: [:index, :create, :show, :update] do
      resources :friendables, only: :create
    end
    resources :friendables, only: [:update,:destroy]
    get "search", to: "searches#index"
  end

  get "auth/:provider/callback" => "api/sessions#omniauth"
  get "auth/demo" => "api/sessions#demo"
end
