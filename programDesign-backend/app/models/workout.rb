class Workout < ApplicationRecord
    belongs_to :program 
    belongs_to :exercise 
end
