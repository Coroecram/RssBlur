class Api::SessionsController < ApplicationController

  def create
  if EmailValidator.valid?(params[:handle])
    @user = User.find_by_email(params[:handle],
                                  params[:password])
  else
   @user = User.find_by_username(params[:handle],
                                 params[:password])
  end

   if @user
     sign_in!(@user)
     render "api/users/show"
   else
     render json: "Incorrect Username or Password", status: 401
   end
 end

 def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

 def destroy
   sign_out!
   render json: {}
   redirect_to root_url
 end

end
