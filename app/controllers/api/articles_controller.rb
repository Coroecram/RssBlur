require 'open-uri'
require 'feedjira'
require 'rss'

class Api::ArticlesController < ApplicationController

  before_action :require_signed_in
  before_action :require_user_website, only: :index

  def index
    @articles = []
    user_articles = UserArticle.where('user_id = ?', current_user.id)
    current_articles = Article.where('website_id = ?', params[:website_id])
                              # .order(created_date: :desc)
    current_articles = current_articles.to_a.map(&:serializable_hash)
    user_articles = user_articles.to_a.map(&:serializable_hash)
    begin
      rss = Feedjira::Feed.fetch_and_parse params[:url]
    rescue
      rss = RSS::Parser.parse(params[:url], do_validate=false)
    end
    page = params[:page].to_i
    range = (page...page+rss.entries.length)
    range.each do |idx|
      rss_article = rss.entries[idx]
      url, title, author, summary, image, created_date = article_parser(rss_article)
      next_article = current_articles.select do |article|
                                                article["created_date"].to_i == created_date.to_i
                                             end

      next_article[0] ||= Article.create!(
                                      url: url,
                                      title: title,
                                      author: author,
                                      summary: summary,
                                      image: image,
                                      created_date: created_date,
                                      website_id: params[:website_id]
                                     )

      next_article = next_article.first
      article_id = next_article["id"] || next_article.id
      @articles.push(next_article)
      user_article = user_articles.select do |userarticle|
                                              userarticle["article_id"].to_i == article_id
                                          end
       UserArticle.create!(
                          user_id: current_user.id,
                          article_id: article_id,
                          read: false,
                          pseudo_read: false
                         ) if user_article.empty?
    end
    render json: @articles
  end

  private

  def article_parser(rss_entry)
    url = rss_entry.url
    noko_page = Nokogiri::HTML(rss_entry.summary)
    title = rss_entry.title || "Untitled"
    author = rss_entry.author || "anonymous"
    summary = noko_page.text
    if noko_page.css('img').empty?
      noko_page = Nokogiri::HTML(open(rss_entry.url))
      image = noko_page.css('img').first['src']
    end
    created_date = rss_entry.published
    params = [url, title, author, summary, image].map { |param| param.force_encoding('UTF-8') if param }
    params.push(created_date)
  end
end

class RSS::Rss
  def entries
    return self.channel.items
  end
end

class RSS::Rss::Channel::Item
  def author
    return self.dc_creator
  end

  def summary
    return self.description
  end

  def url
    return self.link
  end

  def published
    return self.pubDate
  end
end
