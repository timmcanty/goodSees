class Film < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:title, :imdb_url, :description]
  pg_search_scope :search_for_film, against: [:title, :imdb_url, :description]

  has_attached_file :image, default_url: "missing-film.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates :title, presence: true
  validates :imdb_url, presence: true, uniqueness: true

  has_many :film_reels
  has_many :reels, through: :film_reels
  has_many :ratings
  has_many :users, through: :ratings
  has_many :mentions, class_name: 'Activity', as: :mentionable


  def average_rating
    ratings.average("star_rating").to_f.round(3)
  end

end
