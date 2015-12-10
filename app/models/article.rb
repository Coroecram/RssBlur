class Article < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_on_title, against: [:title]
  pg_search_scope :search_on_summary, against: [:summary]
  pg_search_scope :search_on_author, against: [:author]

  multisearchable against: [:title, :summary, :author]

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
