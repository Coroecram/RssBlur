class FBUser < ActiveRecord::Base

  attr_accessor :access_token, :expires_in, :reauthorize_in
  attr_reader :email, :fb_id

  validates :fb_id, :email, uniqueness: true
  validates :access_token, :expires_in, :reauthorize_in, presence: true

end
