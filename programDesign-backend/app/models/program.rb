class Program < ApplicationRecord
    has_many :workouts 
    has_many :exercises, through: :workouts
end
