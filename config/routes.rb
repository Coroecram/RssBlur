Rails.application.routes.draw do
  root to: 'static_pages#content'


  namespace :api, defaults: {format: :json} do
    resources :websites, only: [:index, :create, :show, :destroy]
    resources :articles, only: [:index, :show]
    resources :users, except: [:new, :edit]
    resource :session, only: [:create, :destroy, :show]
    delete "user_websites" => "user_websites#destroy"
    get "user_articles/unreadcount/:id" => "user_articles#unread_count"
    get "user_articles/unread/:id" => "user_articles#unread"
    get "user_articles/all_unread" => "user_articles#all_unread"
    get "allarticles" => "articles#all"
    post "user_articles/read/:id" => "user_articles#mark_read"
    post "user_articles/all_read" => "user_articles#mark_all_read"
    post "guest_user" => "users#create_guest"
    get "search", to: "searches#index"
  end
end
