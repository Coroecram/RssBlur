class User < ActiveRecord::Base
  attr_reader :password

  validates :email, presence: true, uniqueness: true, email: true
  validates :username, :password_digest, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }, confirmation: { allow_nil: true }
  validate :check_email_and_password
  validate :check_username_and_password
  before_validation :ensure_session_token
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  validates_attachment :avatar, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] },
                                size: { in: 0..2.megabytes }

  has_attached_file :avatar, styles: { medium: "100x100>", thumb: "50x50>" }, default_url: "/images/default-image.png"
  has_many :websites, through: :user_websites
  has_many :folders, through: :user_websites
  has_many :user_websites, dependent: :destroy
  has_many :user_articles, dependent: :destroy
  has_many :articles, through: :user_articles

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password).is_password?
  end

  def self.find_by_email(email, password)
    user = User.find_by(email: email)

    return nil if user.nil?
    user.password_digest.is_password?(password) ? user : nil
  end

  def self.find_by_username(username, password)
    user = User.find_by(username: username)

    return nil if user.nil?
    user.password_digest.is_password?(password) ? user : nil
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def check_email_and_password
    errors.add(:password, "can't be the same as email") if email == password
  end

  def check_username_and_password
    errors.add(:password, "can't be the same as username") if username == password
  end

end
