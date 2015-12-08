class UserWebsite < ActiveRecord::Base
  validates :website_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :website
  # belongs_to :folder

  has_many :user_articles, through: :website
end
