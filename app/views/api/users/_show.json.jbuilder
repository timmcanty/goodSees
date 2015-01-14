json.extract! user, :username, :id, :featured_id, :email, :name, :location, :birth_date, :bio
json.image_url asset_path(user.image.url(:original))
