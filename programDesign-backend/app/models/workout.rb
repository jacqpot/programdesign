class Workout < ApplicationRecord
    belongs_to :program 
    has_many :exercises_workouts
    has_many :exercises, through: :exercises_workouts
end
