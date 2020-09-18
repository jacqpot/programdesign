class ExerciseSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :bodyPart, :fatigueRating, :description
  has_many :workouts
  belongs_to :workout
  has_many :programs, through: :workouts
end
