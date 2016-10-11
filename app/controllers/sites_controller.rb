class SitesController < ApplicationController
  before_action :set_site, only: [:show]

  def index
    @sites = if params[:query]
                 Site.where("intname", params[:query])
               else
                 Site.all
               end
  end

  def show
    @species = Species.for_site(@site)
  end

  private

  def set_site
    @site = Site.find(params[:id])
  end
end
