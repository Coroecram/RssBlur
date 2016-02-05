class UserMailer < ActionMailer::Base
  default from: "noreply@rssblur.com"

  def welcome_email(user)
    @user = user
    @url  = 'http://www.rssblur.com'
    @portfolio_url = 'http://www.mikebudnick.com'
    @game_url = 'http://www.mikebudnick.com/bountyhunter'
    @resume_url = 'https://docs.google.com/document/d/1Sb45_jBo4zbgZjSEX2gPGYV-SonLddQlQDGua-7Txy4/export?format=pdf'
    mail(to: @user.email, subject: 'Welcome to RSSBlur!')
  end
end
