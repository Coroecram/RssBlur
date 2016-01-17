class Article < ActiveRecord::Base
  validates :url, :title, :author, :created_date, :website_id, presence: true
  validates :url, uniqueness: { scope: :website_id }
  belongs_to :website
  has_many :user_articles
  has_many :users, through: :user_articles

  def self.by_website(website_id)
    debugger
    Article.where('website_id = ?', website_id)
                         .order(created_date: :desc)
  end


end
