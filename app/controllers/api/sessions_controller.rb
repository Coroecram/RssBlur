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
   params[:email] ||= params[:userID][-7...-1] + "@facebook.com"
    expires_in = DateTime.now + params[:expiresIn].to_i.seconds
    reauthorize_in = DateTime.now + params[:reauthorize_required_in].to_i.seconds
    puts("expires_in #{expires_in}")
    puts("reauthorize_required_in #{reauthorize_in}")
    fb_user = FBUser.create({
     fb_id: params[:userID],
     email: params[:email],
     access_token: params[:accessToken],
     expires_in: expires_in,
     reauthorize_in: reauthorize_in
    })
    sign_in!(fb_user)
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
