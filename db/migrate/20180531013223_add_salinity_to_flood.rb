class AddSalinityToFlood < ActiveRecord::Migration[5.1]
  def change
    add_column :floods, :salinity, :decimal
  end
end
