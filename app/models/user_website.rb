class UserWebsite < ActiveRecord::Base
  validates :website_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :website
end
