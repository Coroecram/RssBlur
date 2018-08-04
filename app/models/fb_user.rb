class FBUser < ActiveRecord::Base
  attr_accessor :access_token, :expires_in, :reauthorize_in

  validates :fb_id, presence: true, uniqueness: true
  validates :access_token, :expires_in, :reauthorize_in, presence: true

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.session_expires = DateTime.now + 7
    begin
      self.save!
    rescue Error => e
      puts e
    end
    self.session_token
  end

end
