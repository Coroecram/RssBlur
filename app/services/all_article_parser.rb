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
        articles = ArticleParser.new(@user.id,
                                     website.id, website.url)
      end
    end
  end
end
