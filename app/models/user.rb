class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :email,  presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :session_tokens, dependent: :destroy
  has_many :reels, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :films, through: :ratings

  before_create :build_default_reels
  after_create :set_featured_reel

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def is_admin?
    self.admin
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def build_default_reels #change to build
    reels.new( name: 'To Watch', custom: false)
    reels.new( name: 'Watched', custom: false)
  end

  def set_featured_reel
    watched = Reel.find_by( user_id: self.id, name: 'Watched')
    self.update(featured_id: watched.id)
  end

  def update_reels_for_film(wanted_reels, film_id)
    unwanted_reels = self.reels.ids - wanted_reels

    User.transaction do
      FilmReel.where("film_id = ? AND reel_id in (?)", film_id, unwanted_reels).destroy_all
      wanted_reels.each do |reel_id|
        FilmReel.find_or_create_by( film_id: film_id, reel_id: reel_id )
      end
    end
  end


end
