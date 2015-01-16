json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.name user.name
  json.location user.location
  if current_user
    json.friend_status user.friend_status(current_user)
  end
  json.image_url asset_path(user.image.url(:original))
end
