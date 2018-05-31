# frozen_string_literal: true

class Flood < ApplicationRecord



  has_attached_file :close_up, styles: { thumb: '150x150>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :close_up, content_type: /\Aimage\/.*\z/

  has_attached_file :context, styles: { thumb: '150x150>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :context, content_type: /\Aimage\/.*\z/

  has_attached_file :water_depth_photo, styles: { thumb: '150x150>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :water_depth_photo, content_type: /\Aimage\/.*\z/

  has_attached_file :salinity_photo, styles: { thumb: '150x150>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :salinity_photo, content_type: /\Aimage\/.*\z/

  has_attached_file :bottle_photo, styles: { thumb: '150x150>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :bottle_photo, content_type: /\Aimage\/.*\z/

  enum water_depth_units: {
    inches: 0,
    centimeters: 1
  }

end
