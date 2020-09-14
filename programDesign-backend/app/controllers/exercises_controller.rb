class ExercisesController < ApplicationController
  before_action :set_exercise, only: [:show, :update, :destroy]
  # def show
  #   sighting = Sighting.find_by(id: params[:id])
  #   options = {
  #     include: [:bird, :location]
  #   }
  #   render json: SightingSerializer.new(sighting, options)
  # end
  # GET /exercises
  def index
    @exercises = Exercise.all
    options = {
      include: [:workouts]
    }
    render json: ExerciseSerializer.new(@exercises, options)
  end
  # def show
  #   options = {
  #     include: [:workouts]
  #   }
  #   render json: ProgramSerializer.new(@program, options)
  # end
  # GET /exercises/1
  def show
    options = {
      include: [:workouts]
    }
    render json: ExerciseSerializer.new(@exercise, options)
  end

  # POST /exercises
  def create
    @exercise = Exercise.new(exercise_params)

    if @exercise.save
      render json: @exercise, status: :created, location: @exercise
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /exercises/1
  def update
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  # DELETE /exercises/1
  def destroy
    @exercise.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_exercise
      @exercise = Exercise.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def exercise_params
      params.require(:exercise).permit(:BodyPart, :fatigueRating, :name, :desciption)
    end
end
