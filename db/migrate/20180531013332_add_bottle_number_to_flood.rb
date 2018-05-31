class AddBottleNumberToFlood < ActiveRecord::Migration[5.1]
  def change
    add_column :floods, :bottle_number, :integer
  end
end
