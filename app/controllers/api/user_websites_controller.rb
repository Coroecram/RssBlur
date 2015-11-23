class Api::UserWebsitesController < ApplicationController

  def destroy
    debugger
    UserWebsite.find_by_user_id_and_website_id(current_user.id, params[:website_id]).delete
  end
end
