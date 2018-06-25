class AllArticleParser
  attr_reader :articles

  def initialize(user)
    @user = user

    fetch_articles
  end

  def fetch_articles
    if @user.websites
      @user.websites.each do |website|
        puts "user.websites #{website}"
        articles = ArticleParser.new(@user.id,
                                     website.id, website.url)
      end
    end
  end
end
