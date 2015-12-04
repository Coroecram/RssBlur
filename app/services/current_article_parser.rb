require 'open-uri'
require 'feedjira'
require 'rss'

class CurrentArticleParser
  attr_reader :articles

  def initialize(website_id, url)
    @articles = []
    @website_id = []
    @url = url

    current_articles
  end

  def current_articles
    current_articles = Article.where('website_id = ?', @website_id)
                           .order(created_date: :desc)
    current_articles = current_articles.to_a.map(&:serializable_hash)
    current_articles_ids = current_articles.map{ |article| article["id"] }
    user_articles = UserArticle.current_user_articles(current_articles_ids)
    user_articles = user_articles.to_a.map(&:serializable_hash)
    user_article_keys = {}
    user_articles.each { |user_article| user_article_keys[user_article["article_id"].to_i] = user_article }
    current_article_created_keys = {}
    current_article_url_keys = {}
    current_articles.each { |article| current_article_created_keys[article["created_date"].to_i] = article }
    current_articles.each { |article| current_article_url_keys[article["url"]] = article }

    return feed_parse(current_article_created_keys, current_article_url_keys)
  end

  private

  def feed_parse(current_articles_created_keys, current_article_url_keys)
    begin
      rss = Feedjira::Feed.fetch_and_parse @url
    rescue
      rss = RSS::Parser.parse(@url, do_validate=false)
    end
    page = params[:page].to_i
    range = (page...page+rss.entries.length)
    range.each do |idx|
      rss_article = rss.entries[idx]
      url, title, author, summary, image, created_date = article_parser(rss_article, rss)
      next_article = current_article_created_keys[created_date.to_i] ||
                     current_article_url_keys[url] ||
                     Article.create!(
                                      url: url,
                                      title: title,
                                      author: author,
                                      summary: summary,
                                      image: image,
                                      created_date: created_date,
                                      website_id: @website_id
                                    )
      new_article_id = next_article["id"] || next_article.id
      @articles.push(next_article)
      user_article_keys[new_article_id] || UserArticle.create!(
                                                        user_id: current_user.id,
                                                        article_id: new_article_id,
                                                        read: false,
                                                        website_id: @website_id
                                                      )
      return @articles
  end

  def article_parser(rss_entry, source)
    url = rss_entry.url
    noko_page = Nokogiri::HTML(rss_entry.summary)
    title = rss_entry.title || "Untitled"
    author = rss_entry.author || "anonymous"
    summary = noko_page.text
    if noko_page.css('img').empty?
      noko_page = Nokogiri::HTML(open(rss_entry.url))
    end
    image = noko_page.css('img').first['src'] if noko_page.css('img').first['src'] =~ URI::regexp
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
