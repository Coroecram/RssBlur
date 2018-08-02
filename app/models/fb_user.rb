class FBUser < ActiveRecord::Base
  
  new_access_info = oauth.exchange_access_token_info auth.credentials.token
  new_access_token = new_access_info["access_token"]
  new_access_expires_at = DateTime.now + new_access_info["expires"].to_i.seconds


end
