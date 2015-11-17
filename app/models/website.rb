class Website < ActiveRecord::Base

  validates :name, :url, presence: true, uniqueness: true
  has_many :user_websites
  has_many :users, through: :user_websites

end
