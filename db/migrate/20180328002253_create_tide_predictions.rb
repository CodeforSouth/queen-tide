class CreateTidePredictions < ActiveRecord::Migration[5.1]
  def change
    create_table :tide_predictions do |t|
      t.integer :station
      t.integer :month
      t.text :month_data
      t.integer :year

      t.timestamps
    end
  end
end
