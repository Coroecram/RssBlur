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
  params
  puts(params)
  if EmailValidator.valid?(params[:email])
    @user = User.find_by_email(params[:email],
                                  params[:id])
  end

   if @user
     sign_in!(@user)
     render "api/users/show"
   else
     
   end
  email = params[:email] || params[:userID][-7...-1] + "@facebook.com"
  expires_in = DateTime.now + params[:expiresIn].to_i.seconds
  reauthorize_in = DateTime.now + params[:reauthorize_required_in].to_i.seconds
  # fb_user = FBUser.find_or_create_by({
  #  fb_id: params[:userID],
  #  email: email,
  #  access_token: params[:accessToken],
  #  expires_in: expires_in,
  #  reauthorize_in: reauthorize_in
  # })

  render json: fb_user
 end

 def fb_util
   fb_users = FBUser.all
   FBUser.delete(fb_users)
   fb_users.each { |fb_user|
     puts("id: #{fb_user.id}")
     puts("fb_id: #{fb_user.fb_id}")
     puts("email: #{fb_user.email}")
     puts("access_token: #{fb_user.access_token}")
     puts("session_token: #{fb_user.session_token}")
   }
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
