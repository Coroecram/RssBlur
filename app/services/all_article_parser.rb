class AllArticleParser
  attr_reader :articles

  def initialize(user)
    @user = user
    @articles = []

    fetch_articles
  end

  def fetch_articles
    if @user.websites
      @user.websites.each do |website|
        articles = ArticleParser.new(@user.id, 0,
                                     website.id, website.url)
        @articles.concat(articles.articles.flatten)
      end
      @articles = @articles.sort_by { |article| article["created_at"] }.reverse
    end
  end
  @articles
end
