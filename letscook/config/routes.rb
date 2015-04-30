Rails.application.routes.draw do
  root 'welcome#index'

  get '/search_results' => 'recipes#search_results'
  get '/search_results/:recipe_id' => 'recipes#search_result'

  resources :users, except: [:index] do
    resources :recipes
    get '/grocery_list' => 'grocery_lists#show'
    patch '/grocery_list' => 'grocery_lists#update'
  end

  resources :sessions, only: [:create]

  get '/signup' => 'users#new'
  get '/signin' => 'sessions#new'
  delete '/signout' => 'sessions#destroy'

end
