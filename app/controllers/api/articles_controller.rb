require 'open-uri'
require 'link_thumbnailer'
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
      next_article = current_articles.bsearch do |article|
                                                article["created_date"].to_i == created_date.to_i
                                              end
      next_article ||= Article.create(
                                      url: url,
                                      title: title,
                                      author: author,
                                      summary: summary,
                                      image: image,
                                      created_date: created_date,
                                      website_id: params[:website_id]
                                     )
      @articles.push(next_article)
      article_id = next_article["id"] || next_article.id
      user_article = user_articles.bsearch do |userarticle|
                                                      userarticle["user_id"] == current_user.id &&
                                                      userarticle["article_id"] == article_id
                                                   end
      user_article ||  UserArticle.create(
                                          user_id: current_user.id,
                                          article_id: article_id,
                                          read: false,
                                          pseudo_read: false
                                         )
    end
    @articles.to_json
    # debugger
  end

  private

  def article_parser(rss_entry)
    begin
      meta_page = MetaInspector.new(rss_entry.url)
      thumblink = LinkThumbnailer.generate(rss_entry.url, image_limit: 1, http_open_timeout: 2, image_stats: false)
    rescue
    end
    url = rss_entry.url
    title = rss_entry.title || "Untitled"
    author = rss_entry.author || "anonymous"
    summary = summary_parser(rss_entry, thumblink, meta_page)
    image = image_parser(thumblink, meta_page)
    created_date = created_date_parser(rss_entry, thumblink, meta_page)
    params = [url, title, author, summary, image].map { |param| param.force_encoding('UTF-8') if param }
    params.push(created_date)
  end

  def summary_parser(rss_entry, thumblink, meta_page)
    rss_summary = rss_entry.summary
    meta_summary = meta_page.meta.to_h["og:description"] if meta_page
    thumb_summary = thumblink.description if thumblink
    return meta_summary || thumb_summary || rss_summary || ""
  end

  def image_parser(thumblink, meta_page)
    meta_image_url = meta_page.meta.to_h["og:image"] if meta_page && url_validation(meta_page.meta.to_h["og:image"])
    thumb_link_img_uri = URI(thumblink.images.first.src) if thumblink && url_validation(thumblink.images.first.src)
    thumb_link_img_url = "#{thumb_link_img_uri.scheme}://#{thumb_link_img_uri.host}#{thumb_link_img_uri.path}" if url_validation(thumb_link_img_uri)
    return meta_image_url || thumb_link_img_url || nil
  end

  def created_date_parser(rss_entry, thumblink, meta_page)
    rss_entry_created = rss_entry.published
    meta_created = meta_page.meta.to_h["article:published_time"] if meta_page
    return rss_entry_created || meta_created || nil
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
