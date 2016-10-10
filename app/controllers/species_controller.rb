class SpeciesController < ApplicationController
  def index
    @species = if params[:query]
                 Species.where("scientificname", params[:query])
               else
                 Species.all
               end
  end
end
