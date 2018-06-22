class UserMailer < ActionMailer::Base
  default from: "noreply@rssblur.com"

  def welcome_email(user)
    @user = user
    @url  = 'http://www.rssblur.com'
    @portfolio_url = 'http://www.mikebudnick.com'
    @game_url = 'http://www.mikebudnick.com/bountyhunter'
    attachments['MichaelBudnickResume.pdf'] = File.read('lib/assets/pdfs/MichaelBudnickResume.pdf')
    mail(to: @user.email, subject: 'Welcome to RSSBlur!')
  end
end
