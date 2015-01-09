class Reel < ActiveRecord::Base
  validates :name, presence: true
  validates :user_id, presence: true
  validates_uniqueness_of :name, scope: :user_id

  belongs_to :user
  has_many :films, through: :film_reels
  has_many :film_reels


  def add_film(film_id)
    FilmReel.find_or_create_by( film_id: film_id, reel_id: self.id)
  end

  def remove_film(film_id)
    FilmReel.find_by( film_id: film_id, reel_id: self.id).destroy
  end

end
