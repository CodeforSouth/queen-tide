class CreateFloods < ActiveRecord::Migration[5.1]
  def change
    create_table :floods do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.datetime :date_of_report
      t.text :description
      t.decimal :latitude, {:precision=>10, :scale=>6}
      t.decimal :longitude, {:precision=>10, :scale=>6}

      t.timestamps
    end
  end
end
