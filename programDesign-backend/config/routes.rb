Rails.application.routes.draw do
  resources :exercises
  resources :workouts
  resources :programs
  resources :exercises_workouts, only: [:create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
