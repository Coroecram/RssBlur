Rails.application.routes.draw do
  root to: 'static_pages#content'


  namespace :api, defaults: {format: :json} do
    resources :websites do
      get 'feed', on: :collection
    end
    resources :websites, only: [:index, :create, :show, :destroy]
    resources :articles, only: [:index, :show]
    resources :users, except: [:new, :edit]
    resource :session, only: [:create, :destroy, :show]
    # resources :user_websites, only: :destroy, default: {id = nil}
    delete "user_websites" => "user_websites#destroy"
  end
end
