class Api::SessionsController < ApplicationController

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
     render json: {errors: ["Incorrect Username or Password"]}, status: 401
   end
 end

 def destroy
   redirect_to new_session_url
   render json: {}
 end

 private

 def user_params
   params.require(:user).permit(:handle, :password)
 end
end
