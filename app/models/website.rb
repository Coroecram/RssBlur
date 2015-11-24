class Website < ActiveRecord::Base

  validates :name, :url, presence: true, uniqueness: true
  validates :url, :format => URI::regexp(%w(http https))
  has_many :user_websites
  has_many :users, through: :user_websites
  has_many :articles
  has_many :user_articles, through: :articles
end
