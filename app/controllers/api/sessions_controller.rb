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
    fb_user = FBUser.create({
     fb_id: params[:userID],
     email: params[:email],
     access_token: params[:accessToken].to_s,
     expires_in: params[:expiresIn],
     reauthorize_in: params[:reauthorize_required_in]
    })
    sign_in!(fb_user)
   render json: fb_user
 end

 def fb_util
   puts("FBUTILBUTUTITLTUTLTTTILTITLI")
   to_delete = FBUser.where("fb_id = '10156497309493688'")
   puts(to_delete)
   FBUser.delete(FBUser.all)
   render json: to_delete
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
