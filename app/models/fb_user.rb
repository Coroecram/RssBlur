class FBUser < ActiveRecord::Base

  attr_accessor :access_token, :expires_in, :reauthorize_in
  attr_reader :email

  validates :fb_id, presence: true, uniqueness: true
  validates :access_token, :expires_in, :reauthorize_in, presence: true

  def fb_id=(fb_id)
    @fb_id = fb_id
    self.fb_id_digest = BCrypt::Password.create(fb_id)
  end

  def is_fb_id?(fb_id)
    BCrypt::Password.new(fb_id).is_password?
  end

  def fb_id_digest
    BCrypt::Password.new(super)
  end

end
