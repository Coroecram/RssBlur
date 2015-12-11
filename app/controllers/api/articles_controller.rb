class Api::ArticlesController < ApplicationController

  before_action :require_signed_in
  before_action :require_user_website, only: :index

  def index
    debugger
    articles = ArticleParser.new(current_user.id, params[:page],
                                 params[:website_id].to_i, params[:url])
    @articles = articles.articles
    render json: @articles
  end

  def all
    debugger
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
