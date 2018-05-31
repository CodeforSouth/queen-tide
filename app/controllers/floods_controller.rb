# frozen_string_literal: true

class FloodsController < ApplicationController
  before_action :authenticate_admin!, only: [:index]
  def index
    @floods = Flood.all
  end

  def new
    @flood = Flood.new
  end

  def create
    @flood = Flood.new flood_params
    if @flood.save
      flash[:notice] = 'Thank you for contributing data!'
      redirect_to action: :new
    else
      flash.now[:error] = "Oops. There were errors:\n#{@flood.errors.full_messages.to_sentence}"
      render :new
      end
  end

  private

  def flood_params
    params.require(:flood).permit(
      :first_name,
      :last_name,
      :email,
      :date_of_report,
      :description,
      :latitude,
      :longitude,
      :close_up,
      :context,
      :water_depth,
      :water_depth_units,
      :water_depth_photo,
      :salinity,
      :salinity_photo,
      :bottle_number,
      :bottle_photo
    )
  end
end
