class Api::UserArticlesController < ApplicationController

  def unread
    @unreads = UserArticle.where('user_id = ? AND
                              website_id = ? AND
                              read = false', current_user.id, params[:id].to_i)
  end

  def all_unread
    @unreads = UserArticle.where('user_id = ? AND
                                read = false', current_user.id)
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

end
