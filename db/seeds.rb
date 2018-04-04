#create default user
if Admin.find_by(email: ENV['default_user_email']).nil?
    Admin.create!(email: ENV['default_user_email'], password: ENV['default_user_password'], password_confirmation: ENV['default_user_password'])
end

predictions = []
puts "begun at", Time.now

json = File.read('db/tidesByMonth.json')
parsedJSON = JSON.parse(json)

parsedJSON.each do |station, years|
    years.each do |year, months|
        months.each_with_index do |month_data, month|
            prediction = TidePrediction.create(station: station, year: year, month: month+1, month_data: month_data)
            prediction.save
        end
    end
    puts "Parsed station #{station}"
end
puts "ended at", Time.now
