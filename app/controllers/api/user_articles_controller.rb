class Api::UserArticlesController < ApplicationController

  def unread
    @unread = UserArticle.where('user_id = ? AND
                              website_id = ? AND
                              read = false', current_user.id, params[:id].to_i)
  end

  def unread_count
     count = UserArticle.where('user_id = ? AND
                              website_id = ? AND
                              read = false', current_user.id, params[:id].to_i)
                              .count
    @unread_count = {count: count}
  end

  def mark_read
    user_article = UserArticle.where('user_id = ? AND
                        article_id = ?',
                        current_user.id, params[:id].to_i).first
    user_article.update(read: true)
    render json: {}
  end

  def mark_all_read
    debugger
  end

end
