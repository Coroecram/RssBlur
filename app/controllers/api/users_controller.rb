class Api::UsersController < ApplicationController

  before_action :require_signed_in, only: [:show, :index]

 def index
   @users = User.all
   render json: @users
 end

 def new
   @user = User.new
 end

 def show
   @user = User.find(params[:id])
   render json: @user
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
