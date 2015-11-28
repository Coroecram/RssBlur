Rails.application.routes.draw do
  root to: 'static_pages#content'


  namespace :api, defaults: {format: :json} do
    get 'websites/feed' => "websites#feed"
    resources :websites, only: [:index, :create, :show, :destroy]
    resources :articles, only: [:index, :show]
    resources :users, except: [:new, :edit]
    resource :session, only: [:create, :destroy, :show]
    delete "user_websites" => "user_websites#destroy"
  end
end
