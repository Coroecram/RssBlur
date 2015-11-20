class SessionsController < ApplicationController

  def new

  end

  def create
    if EmailValidator.valid?(user_params[:handle])
      @user = User.find_by_email(user_params[:handle],
                                    user_params[:password])
    else
     @user = User.find_by_username(user_params[:handle],
                                   user_params[:password])
    end

    if @user
      sign_in!(@user)
      flash[:success] = "Welcome back #{@user.username}!"
      redirect_to root_url
    else user.nil?
      flash.now[:alert] = "Wrong email/password combo"
      render :new, status: 401
    end

  end

  def destroy
    sign_out!
    flash[:success] = "Thank you, come again."
    redirect_to new_session_url
  end

  private

  def user_params
    params.require(:user).permit(:handle, :password)
  end
end
