class Api::ArticlesController < ApplicationController

  before_action :require_signed_in
  before_action :require_user_website, only: :index

  def index
    articles = ArticleParser.new(current_user.id, 0,
                                 params[:website_id].to_i, params[:url])
    @articles = articles.articles
    render json: @articles
  end

  def all
    @articles = AllArticleParser.new(current_user)
    render json: @articles
  end

end
