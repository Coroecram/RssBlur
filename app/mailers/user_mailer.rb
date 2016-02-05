class UserMailer < ActionMailer::Base
  default from: "noreply@rssblur.com"

  def welcome_email(user)
    @user = user
    @url  = 'http://www.rssblur.com'
    @portfolio_url = 'http://www.mikebudnick.com'
    @game_url = 'http://www.mikebudnick.com/bountyhunter'
    mail(to: @user.email, subject: 'Welcome to RSSBlur!')
    attachments['MichaelBudnickResume.pdf'] = File.read('app/assets/pdfs/MichaelBudnickResume.pdf')
  end
end
