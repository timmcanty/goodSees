class Film < ActiveRecord::Base
  validates :title, presence: true
  validates :imdb_url, presence: true, uniqueness: true

  has_many :film_reels
  has_many :reels, through: :film_reels
  has_many :ratings
  has_many :users, through: :ratings


  def average_rating
    ratings.average("star_rating").to_f.round(3)
  end

end
