class CreatePrograms < ActiveRecord::Migration[6.0]
  def change
    create_table :programs do |t|
      t.string :goal
      t.integer :length
      t.string :split
      t.string :title
      t.integer :weeklyVolume
      t.integer :workoutsPerWeek
      t.date :startdate 
      t.timestamps
    end
  end
end
