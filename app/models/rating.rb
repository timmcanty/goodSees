class Rating < ActiveRecord::Base
  validates :user_id, presence: true
  validates :film_id, presence: true
  validates_uniqueness_of :user_id, scope: :film_id

  belongs_to :user
  belongs_to :film

  before_create :add_film_to_users_default_reel

  private

  def add_film_to_users_default_reel
    to_watch_reel = self.user.reels.find_by name: 'To Watch'
    watched_reel = self.user.reels.find_by name: 'Watched'
    film_reel = FilmReel.find_or_initialize_by(
      reel_id: [ to_watch_reel.id, watched_reel.id],
      film_id: self.film.id
    )

    film_reel.reel_id =  (self.star_rating) ? watched_reel.id : to_watch_reel.id
    film_reel.save!
  end

end
