class ExercisesWorkoutsController < ApplicationController

  # POST /exercises
  def create
    @exercise_workout = Exercise.new(exercises_workout_params)

    if @exercise_workout.save
      render json: @exercise_workout, status: :created, location: @exercise_workout
    else
      render json: @exercise_workout.errors, status: :unprocessable_entity
    end
  end

  
  private

    # Only allow a trusted parameter "white list" through.
    def exercises_workout_params
      params.require(:exercise).permit(:exercise_id, :program_id)
    end
end
