class WorkoutSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :volume, :warmUp, :date, :exercise
  belongs_to :program
  belongs_to :exercise
end
