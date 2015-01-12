json.array! @films do |film|
  json.id film.id
  json.imdb_url film.imdb_url
  json.title film.title
  json.average_rating film.average_rating
  film.ratings.each do |rating|
    if current_user && rating.user_id == current_user.id
      json.rating do
        json.id rating.id
        json.star_rating rating.star_rating
        json.film_id rating.film_id
        json.user_id rating.user_id
      end
    end
  end

end
