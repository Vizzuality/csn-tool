class SitesController < ApplicationController
  def index
    @sites = if params[:query]
                 Site.where("intname", params[:query])
               else
                 Site.all
               end
  end
end
