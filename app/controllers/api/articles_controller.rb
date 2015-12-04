class Api::ArticlesController < ApplicationController

  before_action :require_signed_in
  before_action :require_user_website, only: :index

  def index
    current_articles = CurrentArticleParser.new(current_user.id, 0,
                                                params[:website_id].to_i, params[:url])
    @articles = current_articles.articles
    render json: @articles
  end

  def all
    @articles = (current_user.articles).order(created_date: :desc).limit('30')
    render json: @articles
  end

end
