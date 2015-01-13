class Film < ActiveRecord::Base

  has_attached_file :image, default_url: "missing-film.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
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
