json.extract! @user, :username, :id, :featured_id, :email, :name, :location, :birth_date, :bio
json.image_url asset_path(@user.image.url(:original))

json.reels @user.reels do |reel|
  json.id reel.id
  json.name reel.name
  json.custom reel.custom

  json.films reel.films do |film|
    json.rating film.ratings.find_by(user_id: @user.id)

    json.image_url asset_path(film.image.url(:original))
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

json.friends @user.friends do |friend|
  json.friend_status friend.friend_status(@user)
  json.id friend.id
  json.image_url asset_path(friend.image.url(:original))
  json.username friend.username
end
