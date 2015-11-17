class SessionsController < ApplicationController
  def create
  if EmailValidator.valid?(user_params[:handle])
    @user = User.find_by_email(user_params[:handle],
                                  user_params[:password])
  else
   @user = User.find_by_username(user_params[:handle],
                                 user_params[:password])
  end

   if @user
     signin(@user)
     redirect_to root_url
   else
     flash.now[:errors] = "Invalid username/password"
     render :new
   end
 end

 def destroy
   current_user.reset_session_token!
   session[:session_token] = nil
   flash[:messages] = "You have logged out!"
   redirect_to new_session_url
 end

 private

 def user_params
   params.require(:user).permit(:handle, :password)
 end
end
