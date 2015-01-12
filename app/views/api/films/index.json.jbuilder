json.array! @films do |film|
  json.id film.id
  json.imdb_url film.imdb_url
  json.title film.title
  json.average_rating film.average_rating
  film.ratings.each do |rating|
    if current_user && rating.user_id == current_user.id
      json.star_rating rating.star_rating || true
    end
  end

end
