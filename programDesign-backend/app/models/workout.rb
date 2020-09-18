class Workout < ApplicationRecord
    belongs_to :program 
    belongs_to :exercise, optional: true
end
