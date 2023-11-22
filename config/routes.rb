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
  # Defines the root path route ("/")

  post '/battle/creat', to: 'battle#create'
  # root "posts#index"
  get '*path', to: 'homepage#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
