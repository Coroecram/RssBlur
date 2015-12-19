class Api::UserWebsitesController < ApplicationController

  def destroy
    @userwebsite = UserWebsite.find_by_user_id_and_website_id(current_user.id, params[:website_id])
    user_articles = @userwebsite.user_articles
    UserArticle.delete(user_articles)
    UserWebsite.delete(@userwebsite)
    render json: {}
  end

end
