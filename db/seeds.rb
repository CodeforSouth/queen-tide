# frozen_string_literal: true

# create default user
if Admin.find_by(email: ENV['default_user_email']).nil?
  Admin.create!(email: ENV['default_user_email'], password: ENV['default_user_password'], password_confirmation: ENV['default_user_password'])
end

predictions = []
puts 'begun at', Time.now

# 3515 Rickenbacker Causeway, Miami, FL 33149, USA
# lat 25.744430765881855
# long value="-80.16302765292971"
#
# depth units = inches
# time value="01:22:36"
# date value="2018-08-07"
#
#
#
#
#  t.string "first_name"
#     t.string "last_name"
#     t.string "email"
#     t.datetime "date_of_report"
#     t.text "description"
#     t.decimal "latitude", precision: 10, scale: 6
#     t.decimal "longitude", precision: 10, scale: 6
#     t.datetime "created_at", null: false
#     t.datetime "updated_at", null: false
#     t.string "address"
#     t.string "close_up_file_name"
#     t.string "close_up_content_type"
#     t.integer "close_up_file_size"
#     t.datetime "close_up_updated_at"
#     t.string "context_file_name"
#     t.string "context_content_type"
#     t.integer "context_file_size"
#     t.datetime "context_updated_at"
#     t.decimal "water_depth"
#     t.integer "water_depth_units"
#     t.decimal "salinity"
#     t.integer "bottle_number"
#     t.string "water_depth_photo_file_name"
#     t.string "water_depth_photo_content_type"
#     t.integer "water_depth_photo_file_size"
#     t.datetime "water_depth_photo_updated_at"
#     t.string "salinity_photo_file_name"
#     t.string "salinity_photo_content_type"
#     t.integer "salinity_photo_file_size"
#     t.datetime "salinity_photo_updated_at"
#     t.string "bottle_photo_file_name"
#     t.string "bottle_photo_content_type"
#     t.integer "bottle_photo_file_size"
#     t.datetime "bottle_photo_updated_at"

sample_data = {
  close_up: File.open('db/seed_images/Close_Up.png', 'rb'),
  context: File.open('db/seed_images/Context.png', 'rb'),
  bottle_photo: File.open('db/seed_images/Bottle_Number.png', 'rb'),
  salinity_photo: File.open('db/seed_images/Salinity.png', 'rb'),
  water_depth_photo: File.open('db/seed_images/Water_Depth.png', 'rb'),
  water_depth_units: 0,
  water_depth: 2,
  salinity: 10,
  bottle_number: 1,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at elementum est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas elit nisi, aliquam vel fermentum ac, aliquam quis felis. Curabitur euismod quam ac ante laoreet lacinia. Sed convallis elit a orci maximus, et aliquet lacus interdum. Pellentesque imperdiet nunc ut felis viverra condimentum. Nulla nec tincidunt dolor. Suspendisse sed justo et magna varius scelerisque eget sed diam. Integer rhoncus nisl ac erat feugiat, id iaculis arcu aliquam. Donec ut magna quis felis ultrices consequat non ut dolor.',
  date_of_report: DateTime.now
}

sample_floods = [{ address: '2200 NW 72nd Ave, Miami, FL 33152, USA',
                   latitude: 25.794208725611895,
                   longitude: -80.31443298740237,
                   first_name: 'Jon',
                   last_name: 'Doe',
                   email: 'jon.doe@fake.moc' },
                 { address: '3341 Poinciana Ave, Miami, FL 33133, USA',
                   latitude: 25.71783274627228,
                   longitude: -80.24559677524417,
                   first_name: 'Juan',
                   last_name: 'Cierva',
                   email: 'juan.cierva@fake.moc' },
                 { address: '2544 Lucerne Ave, Miami Beach, FL 33140, USA',
                   latitude: 25.80193634926706,
                   longitude: -80.14431656284182,
                   first_name: 'Johannes',
                   last_name: 'Pün',
                   email: 'johannes.pun@fake.moc' }]

sample_floods.each do |flood_data|
  flood = Flood.create(flood_data.merge(sample_data))
  flood.save
end

json = File.read('db/tidesByMonth.json')
parsedJSON = JSON.parse(json)
parsedJSON.each do |station, years|
  years.each do |year, months|
    months.each_with_index do |month_data, month|
      prediction = TidePrediction.create(station: station, year: year, month: month + 1, month_data: month_data)
      prediction.save
    end
  end
  puts "Parsed station #{station}"
end
puts 'ended at', Time.now
