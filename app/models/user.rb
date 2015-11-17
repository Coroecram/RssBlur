class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true, uniqueness: true
  validate :password, length: { minimum: 6, allow_nil: true }
  before_validation :ensure_session_token

  def ensure_session_token
    self.session_token ||= reset_session_token!
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password).is_password?
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    return nil if user.nil?
    user.password_digest.is_password?(password) ? user : nil
  end

  def password_digest
    BCrypt::Password.new(super)
  end

end
