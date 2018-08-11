# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180531013441) do

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "floods", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.datetime "date_of_report"
    t.text "description"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "address"
    t.string "close_up_file_name"
    t.string "close_up_content_type"
    t.integer "close_up_file_size"
    t.datetime "close_up_updated_at"
    t.string "context_file_name"
    t.string "context_content_type"
    t.integer "context_file_size"
    t.datetime "context_updated_at"
    t.decimal "water_depth"
    t.integer "water_depth_units"
    t.decimal "salinity"
    t.integer "bottle_number"
    t.string "water_depth_photo_file_name"
    t.string "water_depth_photo_content_type"
    t.integer "water_depth_photo_file_size"
    t.datetime "water_depth_photo_updated_at"
    t.string "salinity_photo_file_name"
    t.string "salinity_photo_content_type"
    t.integer "salinity_photo_file_size"
    t.datetime "salinity_photo_updated_at"
    t.string "bottle_photo_file_name"
    t.string "bottle_photo_content_type"
    t.integer "bottle_photo_file_size"
    t.datetime "bottle_photo_updated_at"
  end

  create_table "tide_predictions", force: :cascade do |t|
    t.integer "station"
    t.integer "month"
    t.text "month_data"
    t.integer "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
