json.extract! @user, :username, :id, :featured_id

json.reels @user.reels do |reel|
  json.id reel.id
  json.name reel.name
  json.custom reel.custom

  json.films reel.films do |film|
    json.average_rating film.average_rating
    json.id film.id
    json.title film.title
    json.imdb_url film.imdb_url
    json.description film.description
    json.reels @user.reels.select { |reel| reel.films.include?(film)} do |reel|
      json.name reel.name
      json.id reel.id
      json.custom reel.custom
    end
  end

end



json.ratings @user.ratings do |rating|
  json.user_id rating.user_id
  json.id rating.id
  json.film_id rating.film_id
  json.star_rating rating.star_rating
  json.view_date rating.view_date
  json.review rating.review
end
