class Workout < ApplicationRecord
    belongs_to :program 
    has_and_belongs_to_many :exercises
end
