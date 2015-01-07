class Film < ActiveRecord::Base
  validates :title, presence: true
  validates :imdb_url, presence: true, uniqueness: true

  has_many :reels, through: :film_reels
end
