json.image_url asset_path(@film.image.url(:original))
json.id @film.id
json.imdb_url @film.imdb_url
json.title @film.title
json.average_rating @film.average_rating
json.description @film.description

if current_user
  json.rating @rating
  json.reels current_user.reels.select { |reel| reel.films.include?(@film)} do |reel|
    json.name reel.name
    json.id reel.id
    json.custom reel.custom
  end
end


json.ratings @film.ratings.each do |rating|
  next if rating.user ==  current_user
  json.extract! rating, *rating.class.column_names
  json.user do
    json.id rating.user.id
    json.username rating.user.username
    json.image_url asset_path(rating.user.image.url(:original))
  end
end
