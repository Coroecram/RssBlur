class AllArticleParser
  attr_reader :articles

  def initialize(user)
    @user = user
    @articles = []

    fetch_articles
  end

  def fetch_articles
    @user.websites.each do |website|
      articles = ArticleParser.new(@user.id, 0,
                                   website.id, website.url)
      @articles.push(articles.articles)
    end
    debugger
  end

end
