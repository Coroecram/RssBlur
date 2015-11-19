class Article < ActiveRecord::Base
  validates :url, :title, :author, :created_date, :website_id, presence: true
  validates :url, uniqueness: { scope: :website_id }
  belongs_to :website
end
