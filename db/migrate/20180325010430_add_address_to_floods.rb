class AddAddressToFloods < ActiveRecord::Migration[5.1]
  def change
    add_column :floods, :address, :string
  end
end
