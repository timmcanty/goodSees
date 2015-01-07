class FilmReel < ActiveRecord::Base
  belongs_to :film
  belongs_to :reel

end
