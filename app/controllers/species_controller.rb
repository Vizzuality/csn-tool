class SpeciesController < ApplicationController
  before_action :set_species, only: [:show]

  def index
    @species = if params[:query]
                 Species.where("scientificname", params[:query])
               else
                 Species.all
               end
  end

  def show
  end

  private

  def set_species
    @species = Species.find(params[:id])
  end
end
