require 'open-uri'
require 'feedjira'
require 'rss'

class ArticleParser
  attr_reader :articles

  def initialize(user_id, website_id, url)
    @articles = []
    @user_id = user_id
    @website_id = website_id
    @url = url
    articles
  end

  def articles
    articles = Article.by_website(@website_id)
    articles = articles.to_a.map(&:serializable_hash)
    articles_ids = articles.map{ |article| article["id"] }
    user_articles = UserArticle.user_website_articles(@user_id, @website_id, articles_ids)
    user_articles = user_articles.to_a.map(&:serializable_hash)
    user_article_keys = {}
    user_articles.each { |user_article| user_article_keys[user_article["article_id"].to_i] = user_article }
    article_by_url = {}
    article_by_title = {}
    articles.each { |article| article_by_url[article["url"]] = article }
    articles.each { |article| article_by_title[article["title"]] = article }

    return feed_parse(article_by_url, article_by_title, user_article_keys)
  end

  private

  def feed_parse(article_by_url, article_by_title, user_article_keys)
    begin
      rss = Feedjira::Feed.fetch_and_parse @url
    rescue
      rss = RSS::Parser.parse(@url, do_validate=false)
    end
    range = (0...rss.entries.length)
    range.each do |idx|
      rss_article = rss.entries[idx]
      url, title, author, summary, image, created_date = article_parser(rss_article, rss)
      next_article = article_by_url[url] ||
                     article_by_title[title] ||
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
        if !user_article_keys[new_article_id]
         UserArticle.create!(
                              user_id: @user_id,
                              article_id: new_article_id,
                              read: false,
                              website_id: @website_id
                            )
        end
      end

    return @articles
  end

  def article_parser(rss_entry, source)
    url = rss_entry.url
    noko_page = Nokogiri::HTML(rss_entry.summary)
    title = rss_entry.title
    title = "Untitled" unless title || title == ""
    author = rss_entry.author || "anonymous"
    summary = noko_page.text[0..300]
    noko_page = Nokogiri::HTML(open(rss_entry.url)) if noko_page.css('img').empty?
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
