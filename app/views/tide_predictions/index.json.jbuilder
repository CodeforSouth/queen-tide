json.array! @predictions do |prediction|
    
    json.zeroBasedMonth (prediction.month - 1)
    json.monthData prediction.month_data

end