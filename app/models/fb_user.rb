class FBUser < ActiveRecord::Base

  attr_accessor :access_token, :expires_in, :reauthorize_in
  attr_reader :email

  validates :fb_id, presence: true, uniqueness: true
  validates :access_token, :expires_in, :reauthorize_in, presence: true

end
