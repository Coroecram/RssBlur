class FBUser < ActiveRecord::Base

  validates :fb_id, :email, :access_token, presence: true, uniqueness: true
  validates :expires_in, :reauthorize_in, presence: true

end
