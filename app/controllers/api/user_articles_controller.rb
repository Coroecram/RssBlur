class Api::UserArticlesController < ApplicationController

  def unread
    count = UserArticle.where('user_id = ? AND
                              website_id = ? AND
                              read = false',
                              current_user.id, params[:id].to_i).count
    @unread = {count: count}
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
