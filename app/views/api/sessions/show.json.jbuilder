json.extract! current_user, :username, :id, :featured_id, :email, :name, :location, :birth_date, :bio
json.image_url asset_path(current_user.image.url(:original))

json.reels current_user.reels do |reel|
  json.id reel.id
  json.name reel.name
  json.custom reel.custom

  json.films reel.films do |film|
    json.image_url asset_path(film.image.url(:original))
    json.average_rating film.average_rating
    json.id film.id
    json.title film.title
    json.imdb_url film.imdb_url
    json.description film.description
    json.reels current_user.reels.select { |reel| reel.films.include?(film)} do |reel|
      json.name reel.name
      json.id reel.id
      json.custom reel.custom
    end
    json.rating current_user.ratings.where(film_id: film.id) do |rating|
      json.user_id rating.user_id
      json.id rating.id
      json.film_id rating.film_id
      json.star_rating rating.star_rating
      json.view_date rating.view_date
      json.review rating.review
    end
  end
end

json.friends current_user.friends do |friend|
  json.friend_status friend.friend_status(current_user)
  json.id friend.id
  json.image_url asset_path(friend.image.url(:original))
  json.username friend.username
end
