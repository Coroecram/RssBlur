class GuestUser

  attr_reader @user

  def initialize
    create_guest
  end

  def create_guest
    password = SecureRandom.urlsafe_base64
    @user = User.create!{
                         username: "Guest#{SecureRandom.urlsafe_base64}",
                         email: "SecureRandom.urlsafe_base64@guest.com",
                         password: password,
                         password_confirmation: password
                        }
    sign_in!(@user)
    the_onion = Website.find_by_url("http://www.theonion.com/feeds/rss")
    engadget = Website.find_by_url("http://www.engadget.com/rss.xml")
    UserWebsite.create({user_id: @user.id, website_id: the_onion.id})
    UserWebsite.create({user_id: @user.id, website_id: engadget.id})
  end
end
