class CreateWorkouts < ActiveRecord::Migration[6.0]
  def change
    create_table :workouts do |t|
      t.integer :volume
      t.string :description
      t.string :warmUp
      t.date :date
      t.references :program
      t.timestamps
    end
  end
end
