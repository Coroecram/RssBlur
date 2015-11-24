require 'open-uri'
require 'link_thumbnailer'
require 'feedjira'

class Api::ArticlesController < ApplicationController
  PAGE_SIZE = 10

  before_action :require_signed_in
  before_action :require_user_website, only: :index

  def index
    @articles = []
    rss = Feedjira::Feed.fetch_and_parse params[:url]
    debugger
    page = params[:page].to_i
    range = (page...page+PAGE_SIZE)
    range.each do |idx|
      jira_article = rss.entries[idx]
      url, title, author, summary, image, created_date = article_parser(jira_article)
      thumblink = LinkThumbnailer.generate(jira_article.url, image_limit: 1, http_open_timeout: 2, image_stats: false)
      @article = Article.find_by_url(url)
      if !@article
        img_uri = URI(thumblink.images.first.src) if thumblink.images.first.src
        img_url = "#{img_uri.scheme}://#{img_uri.host}#{img_uri.path}" if img_uri
        @article = Article.create!(url: jira_article.url,
                                  title: jira_article.title || "Untitled",
                                  author: ruby_article.dc_creator || "anonymous",
                                  summary: thumblink.description || "",
                                  image: img_url || image_path('default-image.JPG'),
                                  created_date: ruby_article.pubDate,
                                  website_id: params[:website_id])
      end
      @articles.push(@article)

    user_article = UserArticle.find_by_user_id_and_article_id(current_user.id, @article.id)
    UserArticle.create!(user_id: current_user.id, article_id: @article.id, read: false, pseudo_read: false) unless user_article
    end

    @articles
  end

  private

  def article_parser(entry)
    # title, author, summary, image, created_date
    url = entry.url
    title = entry.title
    meta_page = MetaInspector.new(url)
  end

end
