json.extract! user, :id, :username, :email
json.thumb image_path(user.avatar.url(:thumb))
json.display image_path(user.avatar.url(:display))
json.preview image_path(user.avatar.url(:preview))
