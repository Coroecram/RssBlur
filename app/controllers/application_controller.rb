class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  before_filter :iframe_action

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
    @current_user.nil? ? nil : @current_user
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user)
    session[:session_token] = user.restore_session_token!
  end

  def self.sign_in!(user)
    session[:session_token] = user.restore_session_token!
  end

  def sign_up!(user)
    session[:session_token] = user.reset_session_token!
    root_folder = Folder.create!({root: true})
    user_website = UserWebsite.create!({user_id: user.id, website_id: 1, folder_id: root_folder.id})
    root_folder.update({user_website_id: user_website.id})
  end

  def sign_out!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_signed_in
    redirect_to '/sign_in' unless signed_in?
  end

  def require_user_website
    websites = current_user.websites
    websites.each do |website|
      if website.id == params[:website_id]
        return true
      end
    end
    return false
  end

  def url_validation(url)
    begin
      url =~ URI::ABS_URI
    rescue
      return false
    end
  end

  def iframe_action
    response.headers.delete "X-Frame-Options"
  end

end
