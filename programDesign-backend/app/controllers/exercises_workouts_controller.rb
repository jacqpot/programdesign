class ExercisesWorkoutsController < ApplicationController

  # POST /exercises
  def create
    @exercise_workout = ExercisesWorkout.new(exercises_workout_params)

    if @exercise_workout.save
      render json: @exercise_workout, status: :created
    else
      render json: @exercise_workout.errors, status: :unprocessable_entity
    end
  end

  
  private

    # Only allow a trusted parameter "white list" through.
    def exercises_workout_params
      params.require(:exercises_workouts).permit(:exercise_id, :workout_id)
    end
end
