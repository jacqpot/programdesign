class Exercise < ApplicationRecord
    has_many :exercises_workouts 
    has_many :workouts, through: :exercises_workouts
    has_many :programs, through: :workouts 
end
