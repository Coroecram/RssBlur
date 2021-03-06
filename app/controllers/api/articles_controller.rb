class Api::ArticlesController < ApplicationController

  before_action :require_signed_in
  before_action :require_user_website, only: :index

  def index
    if params[:page] == "1"
      articles = ArticleParser.new(current_user.id,
                                  params[:website_id].to_i, params[:url])
      @articles = articles.article_store
    else
      params[:per] ||= 20
      @articles = Article.by_website(params[:website_id]).order(created_date: :desc).page(params[:page]).per(params[:per])
      UserArticleCreator.new(@articles, current_user.id, params[:website_id])
    end
    render json: @articles
  end

  def all
    unless current_user.websites.length == 0
      AllArticleParser.new(current_user)
      @articles = current_user.articles.order(created_date: :desc)
                                       .page(params[:page])
      render json: @articles
    else
      render json: {}
    end
  end

end
