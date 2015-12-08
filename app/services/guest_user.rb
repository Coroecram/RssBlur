class GuestUser

  attr_reader :user

  def initialize
    create_guest
  end

  def create_guest
    password = SecureRandom.urlsafe_base64
    @user = User.create!({
                         username: "Guest#{SecureRandom.urlsafe_base64}",
                         email: "#{SecureRandom.urlsafe_base64}@guest.com",
                         password: password,
                         password_confirmation: password
                        })
  end

  def seed_sites
    UserWebsite.create({user_id: @user.id, website_id: 10})
    UserWebsite.create({user_id: @user.id, website_id: 13})
  end
end
