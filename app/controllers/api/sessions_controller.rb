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

 def fb_login
   params[:email] ||= params[:accessToken][1...17] + "@facebook.com"
    fb_user = FBUser.new({
     fb_id: params[:userID],
     email: params[:email],
     access_token: params[:accessToken],
     expires_in: params[:expiresIn],
     reauthorize_in: params[:reauthorize_required_in]
    })
    puts(fb_user)
   render json: fb_user
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
 end

end
