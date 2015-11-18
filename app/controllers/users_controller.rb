class UsersController < ApplicationController

  before_action :require_signed_in, only: [:show, :index]

 def index
   render json: current_user
 end

 def new
   @user = User.new
 end

 def show
   render json: current_user
 end

 def create
   @user = User.new(user_params)
   if @user.save
     session[:session_token] = @user.session_token
     redirect_to root
   else
     flash.now[:errors] = @user.errors.full_messages.to_sentence
     render :new
   end
 end

 private
 def user_params
   params.require(:user).permit(:username, :email, :password, :password_confirmation)
 end
end