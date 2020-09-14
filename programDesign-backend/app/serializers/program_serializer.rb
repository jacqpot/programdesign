class ProgramSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :goal, :length, :split, :workoutsPerWeek, :weeklyVolume, :startdate
  has_many :workouts
  has_many :exercises, through: :workouts
end
