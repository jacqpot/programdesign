class WorkoutsController < ApplicationController
  before_action :set_workout, only: [:show, :update, :destroy]

  
  # GET /workouts
  def index
    @workouts = Workout.all

    render json: @workouts, include: [:exercises]
  end

  # GET /workouts/1
  def show

    render json: @workout, include: [:exercises]
  end

  # POST /workouts
  def create
    @workout = Workout.new(workout_params)
    # byebug
    if @workout.save
      render json: @workout, status: :created, location: @workout
    else
      render json: @workout.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workouts/1
  def update
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: @workout.errors, status: :unprocessable_entity
    end
  end

  # DELETE /workouts/1
  def destroy
    @workout.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workout
      @workout = Workout.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def workout_params
      params.require(:workout).permit(:volume, :description, :warmUp, :date, :program_id, :exercise_ids => [])
    end
end
