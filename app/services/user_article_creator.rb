class UserArticleCreator
  def initialize(articles, user_id, website_id)
    @articles = articles
    @user_id = user_id
    @website_id = website_id

    create_user_articles
  end

  def create_user_articles
    puts "USERARTICLECREATOR.create_user_articlesUSERARTICLECREATOR.create_user_articlesUSERARTICLECREATOR.create_user_articlesUSERARTICLECREATOR.create_user_articles"
    articles = @articles.to_a.map(&:serializable_hash)
    articles_ids = articles.map{ |article| article["id"] }
    user_articles = UserArticle.user_website_articles(@user_id, @website_id, articles_ids)
    user_articles = user_articles.to_a.map(&:serializable_hash)
    user_article_keys = {}
    user_articles.each { |user_article| user_article_keys[user_article["article_id"].to_i] = user_article }

    articles_ids.each do |article_id|
      puts "new_article_idnew_article_idnew_article_idnew_article_id #{article_id}"
      puts "user_article_keys[new_article_id]user_article_keys[new_article_id] #{user_article_keys[article_id]}"
      if !user_article_keys[article_id]
       UserArticle.create!(
                            user_id: @user_id,
                            article_id: article_id,
                            read: false,
                            website_id: @website_id
                          )
      end
    end
  end
end
