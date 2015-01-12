json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.name user.name
  json.name user.location
end
