class Attachment < ApplicationRecord
    belongs_to :flood
    has_attached_file :media
    validates_attachment_content_type :media, :content_type =>['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4', 'video/avi', 'video/mov']

end
