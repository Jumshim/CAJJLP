Rails.application.routes.draw do
  root 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  post '/user/signup', to: 'user#create'
  post '/user/login', to: 'user#login'
  post '/user/update', to: 'user#update'
  get  '/user/info', to: 'user#get_info'
  delete '/user', to: 'user#destroy'
  # Defines the root path route ("/")
  get '/battles', to: 'battles#index'
  get '/user_battles', to: 'battles#user_battles'
  post '/battles/create', to: 'battles#create'
  post '/battles/:id', to: 'battles#update' #route for updating battles 
  delete '/battles/:id', to: 'battles#destroy'
  # root "posts#index"
  get '*path', to: 'homepage#index', constraints: ->(request) do

    !request.xhr? && request.format.html?
  end

  resources :posts
end
