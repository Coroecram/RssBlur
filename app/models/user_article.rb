class UserArticle < ActiveRecord::Base
  validates :article_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :article

  has_one :website, through: :article
end
