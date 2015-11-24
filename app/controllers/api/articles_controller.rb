require 'open-uri'
require 'link_thumbnailer'
require 'feedjira'

class Api::ArticlesController < ApplicationController
  PAGE_SIZE = 10

  before_action :require_signed_in
  before_action :require_user_website, only: :index

  def index
    @articles = []
    debugger
    rss = Feedjira::Feed.fetch_and_parse params[:url]
    page = params[:page].to_i
    range = (page...page+PAGE_SIZE)
    range.each do |idx|
      jira_article = rss.entries[idx]
      url, title, author, summary, image, created_date = article_parser(jira_article)
      @article = Article.find_by_url(url)
      if !@article
        @article = Article.create!(url: url,
                                  title: title,
                                  author: author,
                                  summary: summary,
                                  image: image,
                                  created_date: created_date,
                                  website_id: params[:website_id])
      end
      @articles.push(@article)

    user_article = UserArticle.find_by_user_id_and_article_id(current_user.id, @article.id)
    UserArticle.create!(user_id: current_user.id, article_id: @article.id, read: false, pseudo_read: false) unless user_article
    end

    @articles
  end

  private

  def article_parser(jira_entry)
    meta_page = MetaInspector.new(jira_entry.url)
    thumblink = LinkThumbnailer.generate(jira_entry.url, image_limit: 1, http_open_timeout: 2, image_stats: false)
    url = jira_entry.url
    title = jira_entry.title || "Untitled"
    author = jira_entry.author || "anonymous"
    summary = summary_parser(jira_entry, thumblink, meta_page)
    image = image_parser(jira_entry, thumblink, meta_page)
    created_date = created_date_parser(jira_entry, thumblink, meta_page)
    params = [url, title, author, summary, image].map { |param| param.force_encoding('UTF-8') }
    params.push(created_date)
  end

  def summary_parser(jira_entry, thumblink, meta_page)
    meta_summary = meta_page.meta.to_h["og:description"]
    feedjira_summary = jira_entry.summary
    thumb_summary = thumblink.description
    debugger
    return meta_summary || thumb_summary || feedjira_summary || ""
  end

  def image_parser(jira_entry, thumblink, meta_page)
    meta_image_url = meta_page.meta.to_h["og:image"]
    thumb_link_img_uri = URI(thumblink.images.first.src) if thumblink.images.first.src
    thumb_link_img_url = "#{thumb_link_img_uri.scheme}://#{thumb_link_img_uri.host}#{thumb_link_img_uri.path}" if thumb_link_img_uri
    return meta_image_url || thumb_link_img_url || image_path('default-image.JPG')
  end

  def created_date_parser(jira_entry, thumblink, meta_page)
    jira_entry_created = jira_entry.published
    meta_created = meta_page.meta.to_h["article:published_time"]
    return jira_entry_created || meta_created || nil
  end

end
