class UserWebsite < ActiveRecord::Base
  validates :website_id, uniqueness: { scope: :user_id }

  belongs_to :users
  belongs_to :websites
end
