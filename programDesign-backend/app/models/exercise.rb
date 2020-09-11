class Exercise < ApplicationRecord
    has_many :workouts 
    has_many :programs, through: :workouts 
end
