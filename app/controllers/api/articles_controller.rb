require 'open-uri'
require 'rss'
require 'simple-rss'
require 'link_thumbnailer'

class Api::ArticlesController < ApplicationController
  PAGE_SIZE = 10

  def index
    @articles = []
    rss = RSS::Parser.parse(open(params[:url]))
      debugger
    page = params[:page].to_i
    range = (page...page+PAGE_SIZE)
    range.each do |idx|
      article = rss.items[idx]
      @article = Article.find_by_url(article.link)
      if !@article
        # @article = Article.create!(url: article.link,
        #                            title: article.title,
        #                            summary: article.description,
        #                            author: article.dc_creator,
        #                            created_date: article.pubDate,
        #                            website_id: params[:website_id])
      end
      @articles.push(@article)
    end
    # UserArticle.create(user_id: current_user.id, article_id: @article.id, read: false)

    @articles
  end
end
