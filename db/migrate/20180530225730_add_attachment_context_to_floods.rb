class AddAttachmentContextToFloods < ActiveRecord::Migration[5.1]
  def self.up
    change_table :floods do |t|
      t.attachment :context
    end
  end

  def self.down
    remove_attachment :floods, :context
  end
end
