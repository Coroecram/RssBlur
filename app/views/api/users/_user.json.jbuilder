json.extract! user, :id, :username, :email
json.thumb image_path(user.avatar(:thumb))
json.display image_path(user.avatar(:display))
json.preview image_path(user.avatar(:preview))
