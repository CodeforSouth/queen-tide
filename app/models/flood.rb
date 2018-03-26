class Flood < ApplicationRecord
  has_many :attachments
  #nested model for generic attachments (images and video)
  accepts_nested_attributes_for :attachments,  allow_destroy: true
end
