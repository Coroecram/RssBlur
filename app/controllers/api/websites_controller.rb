class Api::WebsitesController < ApplicationController

  before_action :require_signed_in

  def index
    render json: current_user.websites
  end

  def create
    website = Website.create!(website_params)
    UserWebsite.create!({user_id: current_user.id, website_id: website.id})
    render json: website
  end

  private

  def website_params
    params.require(:website).permit(:url, :folder_id)
  end

end
