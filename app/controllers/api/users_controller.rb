class Api::UsersController < ApplicationController

  before_action :require_signed_in, only: [:show, :index]

  def index
   @users = User.all
  end

  def show
   @user = User.find(params[:id])
  end

  def create
   @user = User.new(user_params)
   if @user
     sign_up!(@user)
     render :show
   else
     render json: @user.errors.full_messages.to_sentence, status: 401
   end
  end

  def update
    if current_user.update(user_params)
      @user = current_user
      render :show
    else
      render json: current_user.errors.full_messages.to_sentence, status: 422
    end
  end

  def create_guest
   guest = GuestUser.new()
   @user = guest.user
   sign_in!(@user)
   guest.seed_sites
   render :show
  end

  private
  def user_params
   params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar)
  end
end
