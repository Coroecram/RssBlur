class UserWebsite < ActiveRecord::Base
  validates :name, length: { maximum: 20 }

  has_many :user_websites
end
