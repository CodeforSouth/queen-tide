class AddAttachmentCloseUpToFloods < ActiveRecord::Migration[5.1]
  def self.up
    change_table :floods do |t|
      t.attachment :close_up
    end
  end

  def self.down
    remove_attachment :floods, :close_up
  end
end
