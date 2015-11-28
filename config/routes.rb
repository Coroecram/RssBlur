Rails.application.routes.draw do
  root to: 'static_pages#content'


  namespace :api, defaults: {format: :json} do
    resources :websites, only: [:index, :create, :show, :destroy]
    resources :articles, only: [:index, :show]
    resources :users, except: [:new, :edit]
    resource :session, only: [:create, :destroy, :show]
    delete "user_websites" => "user_websites#destroy"
    get "user_articles/unreadcount/:id" => "user_articles#unread"
    post "user_articles/unread/:id" => "user_articles#mark_read"
    post "user_articles/unreads" => "user_articles#mark_all_read"
  end
end
