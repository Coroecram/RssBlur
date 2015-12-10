json.extract! user, :id, :username, :email
json.thumb asset_path(user.avatar(:thumb))
json.display asset_path(user.avatar(:display))
json.preview asset_path(user.avatar(:preview))
