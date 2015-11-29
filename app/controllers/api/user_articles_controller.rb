class Api::UserArticlesController < ApplicationController

  def unread
    @unread = UserArticle.where('user_id = ? AND
                              website_id = ? AND
                              read = false', current_user.id, params[:id].to_i)
  end

  def mark_read
    user_article = UserArticle.where('user_id = ? AND
                        article_id = ?',
                        current_user.id, params[:id].to_i)
    debugger
    user_article.update!(read: true)
  end

  def mark_all_read
    debugger
  end

end
