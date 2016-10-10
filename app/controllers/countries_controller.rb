class CountriesController < ApplicationController
  def index
    @countries = if params[:query]
                   Country.where("country", params[:query])
                 else
                   Country.all
                 end
  end
end
