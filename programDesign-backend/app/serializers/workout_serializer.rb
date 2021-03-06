class WorkoutSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :volume, :warmUp, :date, :exercise
  belongs_to :program
  has_many :exercises
  belongs_to :exercise
end
