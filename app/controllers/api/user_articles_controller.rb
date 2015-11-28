class Api::UserArticlesController < ApplicationController

  def unread
    debugger
    @unread = {count: 0}
  end

end


uas = UserArticle.all

uas.each do |ua|
  ua.website_id = ua.website.id
  ua.save!
end
