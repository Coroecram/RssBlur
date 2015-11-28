class Api::UserArticlesController < ApplicationController

  def unread
    count = UserArticle.where('user_id = ? AND website_id = ? AND read = false', current_user.id, params[:id].to_i).count
    @unread = {count: count}
  end

end
