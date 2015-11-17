class Api::WebsitesController < ApplicationController

  # before_action :require_signed_in

  def index
    debugger
    @user_websites = UserWebsite.find_by_user_id(current_user.id
    render json: @user_websites.websites
  end

  def create
  end

end
