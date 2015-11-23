require 'open-uri'
require 'rss'
require 'link_thumbnailer'

class Api::ArticlesController < ApplicationController
  PAGE_SIZE = 10

  def index
    @articles = []
    rss = RSS::Parser.parse(open(params[:url]))
    page = params[:page].to_i
    range = (page...page+PAGE_SIZE)
    range.each do |idx|
      ruby_article = rss.items[idx]
      thumblink = LinkThumbnailer.generate(ruby_article.link, image_limit: 1, http_open_timeout: 2, image_stats: false)
      @article = Article.find_by_url(ruby_article.link)
      if !@article
        @article = Article.create!(url: ruby_article.link,
                                  title: thumblink.title,
                                  author: ruby_article.dc_creator,
                                  summary: thumblink.description,
                                  image: thumblink.images.first.src,
                                  created_date: ruby_article.pubDate,
                                  website_id: params[:website_id])
      end
      @articles.push(@article)

    user_article = UserArticle.find_by_user_id_and_article_id(current_user.id, @article.id)
    UserArticle.create!(user_id: current_user.id, article_id: @article.id, read: false, pseudo_read: false) unless user_article
    end

    @articles
  end
end
