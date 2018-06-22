require 'open-uri'
require 'feedjira'
require 'rss'

class ArticleParser
  attr_reader :article_store

  def initialize(user_id, website_id, url)
    @article_store = []
    @user_id = user_id
    @website_id = website_id
    @url = url
    articles
  end

  def articles
    recently_updated = false
    articles = Article.by_website(@website_id)
    articles = articles.to_a.map(&:serializable_hash)
    articles_ids = articles.map{ |article| article["id"] }
    user_articles = UserArticle.user_website_articles(@user_id, @website_id, articles_ids)
    user_articles = user_articles.to_a.map(&:serializable_hash)
    user_article_keys = {}
    user_articles.each { |user_article| user_article_keys[user_article["article_id"].to_i] = user_article }
    article_by_url = {}
    article_by_title = {}
    puts "articles #{articles}"
    articles.each  do |article|
      article_by_url[article["url"]] = article
      article_by_title[article["title"]] = article
      if article["created_at"] < 3.hours.ago
        puts "RECENTLY UPDATED ARTICLES"
        recently_updated = true
      end
    end

    return recently_updated ? create_user_articles(user_article_keys) : feed_parse(article_by_url, article_by_title, user_article_keys)
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
      puts "rss.entries[idx] #{rss.entries[idx]}"
      url, title, author, summary, created_date = article_parser(rss_article, rss)
      next_article = article_by_url[url] ||
                     article_by_title[title] ||
                     Article.create!(
                                      url: url,
                                      title: title,
                                      author: author,
                                      summary: summary,
                                      created_date: created_date,
                                      website_id: @website_id
                                    )
      new_article_id = next_article["id"] || next_article.id
      @article_store.push(next_article)
        if !user_article_keys[new_article_id]
         UserArticle.create!(
                              user_id: @user_id,
                              article_id: new_article_id,
                              read: false,
                              website_id: @website_id
                            )
        end
      end
    @article_store
  end

  def article_parser(rss_article, source)
    url = rss_article.url
    puts "rss_article.url #{rss_article.url}"
    noko_page = Nokogiri::HTML(rss_article.summary)
    meta_page = MetaInspector.new(url)
    title = meta_page.title || "Untitled"
    author = meta_page.meta['author'] || rss_article.author || "anonymous"
    summary = noko_page.text[0..300]
    created_date = rss_article.published
    params = [url, title, author, summary].map { |param| param.force_encoding('UTF-8') if param }
    params.push(created_date)
  end
end

private
def create_user_articles(articles)
  articles.each_key do |article_id|
    if !UserArticle.by_article_id(article_id)
      UserArticle.create!(
                       user_id: @user_id,
                       article_id: article_id,
                       read: false,
                       website_id: @website_id
                     )
    end
  end
  @article_store.push(articles.values)
  @article_store
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
