class Website < ActiveRecord::Base

  validates :url, :folder_id, presence: true
  validates :url, uniqueness: true
  has_many :user_websites
  has_many :users, through: :user_websites

end
