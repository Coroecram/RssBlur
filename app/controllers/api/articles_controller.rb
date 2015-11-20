require 'open-uri'
require 'rss'
require 'simple-rss'
require 'link_thumbnailer'


# ruby_item.description
# html_doc = Nokogiri::HTML(ruby_article.description)
# html_doc.css('img')
# html_doc.elements.to_s
class Api::ArticlesController < ApplicationController
  PAGE_SIZE = 10

  def index
    @articles = []
    rss = RSS::Parser.parse(open(params[:url]))
    page = params[:page].to_i
    range = (page...page+PAGE_SIZE)
    range.each do |idx|
      ruby_article = rss.items[idx]
      article = LinkThumbnailer.generate(ruby_article.link, image_limit: 1, http_open_timeout: 2, image_stats: false)
      debugger
      @article = Article.find_by_url(ruby_article.link)
      if !@article
        # @article = Article.create!(url: article.link,
        #                            title: thumblink.title,
        #                            summary: article.description,
        #                            author: ruby_article.dc_creator,
        #                            created_date: ruby_article.pubDate,
        #                            website_id: params[:website_id])
      end
      @articles.push(@article)
    end
    # UserArticle.create(user_id: current_user.id, article_id: @article.id, read: false)

    @articles
  end
end
