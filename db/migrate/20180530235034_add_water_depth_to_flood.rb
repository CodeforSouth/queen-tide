class AddWaterDepthToFlood < ActiveRecord::Migration[5.1]
  def change
    add_column :floods, :water_depth, :decimal
    add_column :floods, :water_depth_units, :integer
  end
end
