Rails.application.routes.draw do
  root to: 'static_pages#content'

  resources :users, only: [:index, :new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :websites, only: [:index, :create, :show, :destroy]
    resources :articles, only: [:index, :show]
    resources :users, except: [:new, :edit]
    resource :session, only: [:create, :destroy, :show]
  end
end
