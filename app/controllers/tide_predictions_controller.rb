class TidePredictionsController < ApplicationController
    def index
        today = Time.now
        span = params[:span] ? params[:span].to_i : 2
        @predictions = TidePrediction.where(year:today.year, month: today.month..today.month+span, station: params[:station])
    end
end
