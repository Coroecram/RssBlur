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

  private
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
    articles.each  do |article|
      article_by_url[article["url"]] = article
      article_by_title[article["title"]] = article
    end

    return feed_parse(article_by_url, article_by_title, user_article_keys)
  end

  private
  def feed_parse(article_by_url, article_by_title, user_article_keys)
    articles = []
    articles_to_create = []
    new_articles = []
    begin
      rss = Feedjira::Feed.fetch_and_parse @url
    rescue
      rss = RSS::Parser.parse(@url, do_validate=false)
    end
    range = (0...rss.entries.length)
    range.each do |idx|
      rss_article = rss.entries[idx]
      url, title, author, summary, created_date = article_parser(rss_article, rss)
      articles.push({ url: url,
                      title: title,
                      author: author,
                      summary: summary,
                      created_date: created_date,
                      website_id: @website_id })
    end
    articles_to_create = articles.select{|article| !article_by_url[article[:url]] && !article_by_title[article[:title]]}

    Article.transaction do
      Article.create!(articles_to_create)
    end

    @article_store.push(articles)

    new_user_articles = []
    articles.select{|article| !user_article_keys[article[:id]]}.each do |filtered_article|
              puts "filtered_articlefiltered_articlefiltered_article #{filtered_article}"
              new_user_articles.push({ user_id: @user_id,
                                       article_id: filtered_article[:id],
                                       read: false,
                                       website_id: @website_id }
                                    )
    end
    UserArticle.transaction do
       UserArticle.create!(new_user_articles)
    end

    @article_store
  end

  private
  def create_user_articles(article_ids, user_article_keys)
    # UserArticle.transaction do

    # end
  end

  private
  def article_parser(rss_article, source)
    url = rss_article.url
    noko_page = Nokogiri::HTML(rss_article.summary)
    meta_page = MetaInspector.new(url)
    title = meta_page.title || "Untitled"
    author = meta_page.meta['author'] || rss_article.author || "anonymous"
    summary = noko_page.text[0..300]
    until summary.end_with?(" ")
      summary.chop!
    end
    summary += "..."
    created_date = rss_article.published
    params = [url, title, author, summary].map { |param| param.force_encoding('UTF-8') if param }
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
