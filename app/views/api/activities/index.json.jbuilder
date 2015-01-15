json.array! @activities do |activity|
  json.user_id activity.id
  json.mentionable_id activity.mentionable_id
  json.mentionable_type activity.mentionable_type
  json.message activity.message
  json.created_at time_ago_in_words(activity.created_at)

  json.mentionable activity.mentionable
  json.user activity.user
end
