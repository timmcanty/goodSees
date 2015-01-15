json.total_pages @films.total_pages

json.films @films do |film|
  json.image_url asset_path(film.image.url(:original))
  json.id film.id
  json.imdb_url film.imdb_url
  json.title film.title
  json.average_rating film.average_rating
  if current_user
    json.rating current_user.ratings.find_by(film_id: film.id) 
  end

end
