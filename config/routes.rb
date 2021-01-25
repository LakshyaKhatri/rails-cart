require 'sidekiq/web'

Rails.application.routes.draw do
  root 'admin_dashboard#index'

  get '/login', to: 'session#login'
  post '/login', to: 'session#new'
  get '/logout', to: 'session#logout'

  get '/signup', to: 'registration#new'
  post '/signup', to: 'registration#create'

  scope '/password', as: :password do
    get '/forgot', to: 'password#forgot'
    post '/forgot', to: 'password#create_reset_token'
    get '/reset/:token', to: 'password#reset', as: :reset
    post '/reset/:token', to: 'password#change_password', as: :change_password
  end

  mount Sidekiq::Web => '/sidekiq'
end
