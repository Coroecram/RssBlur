class UserArticle < ActiveRecord::Base
  validates :article_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :article

  has_one :website, through: :article

  def self.user_website_articles(user_id, website_id, article_ids)
    self.where('user_id = ? AND website_id = ? AND article_id IN (?)', user_id, website_id, article_ids)
  end
end
