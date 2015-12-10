class Article < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_by_title, :against => :title
  pg_search_scope :search_by_author, :against => :author
  pg_search_scope :search_by_summary, :against => :summary

  validates :url, :title, :author, :created_date, :website_id, presence: true
  validates :url, uniqueness: { scope: :website_id }
  belongs_to :website
  has_many :user_articles
  has_many :users, through: :user_articles

  def self.by_website(website_id)
    Article.where('website_id = ?', website_id)
                         .order(created_date: :desc)
  end


end
