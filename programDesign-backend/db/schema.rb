# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_18_045432) do

  create_table "exercises", force: :cascade do |t|
    t.string "bodyPart"
    t.string "fatigueRating"
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "exercises_workouts", id: false, force: :cascade do |t|
    t.integer "workout_id", null: false
    t.integer "exercise_id", null: false
    t.index ["exercise_id", "workout_id"], name: "index_exercises_workouts_on_exercise_id_and_workout_id"
    t.index ["workout_id", "exercise_id"], name: "index_exercises_workouts_on_workout_id_and_exercise_id"
  end

  create_table "programs", force: :cascade do |t|
    t.string "goal"
    t.integer "length"
    t.string "split"
    t.string "title"
    t.integer "weeklyVolume"
    t.integer "workoutsPerWeek"
    t.date "startdate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "workouts", force: :cascade do |t|
    t.integer "volume"
    t.string "description"
    t.string "warmUp"
    t.date "date"
    t.integer "program_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["program_id"], name: "index_workouts_on_program_id"
  end

end
