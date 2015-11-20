class Api::UsersController < ApplicationController

  before_action :require_signed_in, only: [:show, :index]

 def index
   @users = User.all
   render :index
 end

 def show
   @user = User.find(params[:id])
   render json: @user
 end

 def create
   @user = User.new(user_params)
   if @user.save
     signin(@user)
     render :show
   else
     render json: {}
   end
 end

 private
 def user_params
   params.require(:user).permit(:username, :email, :password, :password_confirmation)
 end
end
