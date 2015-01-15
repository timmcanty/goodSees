json.total_pages @films.total_pages

json.films @films do |film|
  json.image_url asset_path(film.image.url(:original))
  json.id film.id
  json.imdb_url film.imdb_url
  json.title film.title
  json.average_rating film.average_rating
  if current_user
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
