class ExerciseSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :bodyPart, :fatigueRating, :description
  has_many :workouts
  has_many :programs, through: :workouts
end
