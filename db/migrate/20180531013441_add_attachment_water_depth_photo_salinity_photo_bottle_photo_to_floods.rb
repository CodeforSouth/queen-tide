class AddAttachmentWaterDepthPhotoSalinityPhotoBottlePhotoToFloods < ActiveRecord::Migration[5.1]
  def self.up
    change_table :floods do |t|
      t.attachment :water_depth_photo
      t.attachment :salinity_photo
      t.attachment :bottle_photo
    end
  end

  def self.down
    remove_attachment :floods, :water_depth_photo
    remove_attachment :floods, :salinity_photo
    remove_attachment :floods, :bottle_photo
  end
end
