json.array! @activities do |activity|
  json.user_id activity.id
  json.mentionable_id activity.mentionable_id
  json.mentionable_type activity.mentionable_type
  json.message activity.message
  json.created_at time_ago_in_words(activity.created_at)

  json.mentionable do
    json.extract! activity.mentionable, *activity.mentionable.class.column_names
    json.image_url asset_path(activity.mentionable.image.url(:original))
  end

  json.user do
    json.extract! activity.user, *activity.user.class.column_names
    json.image_url asset_path(activity.user.image.url(:original))
  end
end
