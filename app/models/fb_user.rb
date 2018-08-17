class FBUser < ActiveRecord::Base

  validates :fb_id, :email, :access_token, presence: true, uniqueness: true
  validates :email, email: true, allow_blank: false
  validates :expires_in, :reauthorize_in, presence: true

  before_validation :ensure_session_token

  has_many :websites, through: :user_websites
  has_many :folders, through: :user_websites
  has_many :user_websites, dependent: :destroy
  has_many :user_articles, dependent: :destroy
  has_many :articles, through: :user_articles
  
  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def restore_session_token!
    self.update(session_token: SecureRandom::urlsafe_base64)
    self.session_token
  end

  def reset_session_token!
    self.update(session_token, nil)
  end

end
