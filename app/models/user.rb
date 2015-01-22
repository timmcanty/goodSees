class User < ActiveRecord::Base
  include PgSearch
  acts_as_reader
  multisearchable against: [:username,:name,:location,:bio,:email]
  attr_reader :password
  attr_accessor :created_at

  has_attached_file :image, default_url: "missing-user.png"

  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates :username, :email,  presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :session_tokens, dependent: :destroy
  has_many :reels, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :films, through: :ratings
  has_many :friendables

  has_many :activities
  has_many :mentions, class_name: 'Activity', as: :mentionable

  has_many :inverse_friendables, class_name: 'Friendable', foreign_key: :friend_id

  has_many :friends, -> { where(friendables: {accepted: true})}, through: :friendables
  has_many :requested_friends, -> { where(friendables: {accepted: false})}, through: :friendables, source: :friend
  has_many :pending_friends, -> {where(friendables: {accepted: false})}, through: :inverse_friendables, source: :user



  before_create :build_default_reels
  after_create :set_featured_reel

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid]
    )

    if user.nil?
      user = User.create!(
        username: auth_hash[:info][:nickname],
        name: auth_hash[:info][:name],
        location: auth_hash[:info][:location],
        bio: auth_hash[:info][:location],
        image: auth_hash[:info][:image],
        password: SecureRandom.urlsafe_base64(16),
        email: auth_hash[:info][:nickname],
        provider: auth_hash[:provider],
        uid: auth_hash[:uid]
      )
    end

    user
  end

  def self.create_demo_user
    ActiveRecord::Base.transaction do
      demo_user = User.create!(
        username: 'demouser' + SecureRandom.urlsafe_base64(3),
        name: Faker::Name.name,
        location: Faker::Address.city + ', ' + Faker::Address.state,
        bio: Faker::Lorem.paragraph(3),
        password: 'funtime',
        email: Faker::Internet.email,
        image: 'http://d1oq12oz7mp8bh.cloudfront.net/wp-content/uploads/2012/10/DemoIconLarge-green.jpg'
      )

      demo_user.reels.create!(
        name: 'My first custom reel',
        custom: true
      )

      film = Film.find_by( title: 'The Muppets')

      demo_user.ratings.create!(
        film_id: film.id,
        star_rating: 5,
        view_date: Faker::Date.backward(14),
        review: Faker::Lorem.paragraph(2),
      )

      friend1 = User.find_by(username: 'Dusty')
      friend2 = User.find_by(username: 'Camren')
      friend3 = User.find_by(username: 'Kallie')
      friend4 = User.find_by(username: 'Torrey')

      request = demo_user.friendables.create!(
        friend_id: friend1.id
      )

      request.accept

      friend2.friendables.create!(
        friend_id: demo_user.id
      )

      demo_user.friendables.create!(
        friend_id: friend3.id
      )

      demo_user.activities.create!(
        mentionable_id: film.id,
        mentionable_type: 'Film',
        message: 'has reviewed',
        created_at: Faker::Time.between(2.days.ago, Time.now, :evening)
      )

      friend1.activities.create!(
        mentionable_id: demo_user.id,
        mentionable_type: 'User',
        message: 'is now friends with',
        created_at: Faker::Time.between(2.days.ago, Time.now, :evening)
      )

      demo_user
    end
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
    self.update(featured_id: self.watched.id)
  end

  def watched
    Reel.find_by( user_id: self.id, name: 'Watched')
  end

  def to_watch
    Reel.find_by( user_id: self.id, name: 'To Watch')
  end

  def update_reels_for_film(wanted_reels, film_id)
    unwanted_reels = self.reels.ids - wanted_reels

    User.transaction do
      FilmReel
        .where("film_id = ? AND reel_id in (?)", film_id, unwanted_reels)
        .destroy_all
      wanted_reels.each do |reel_id|
        FilmReel.find_or_create_by( film_id: film_id, reel_id: reel_id )
      end
    end
  end

  def friend_status(user)
    return 'Friends' if self.friends.include?(user)
    return 'Request Sent' if self.pending_friends.include?(user)
    return 'Request Pending' if self.requested_friends.include?(user)
    return 'Not Friends'
  end

  def feed_activities(num)
    Activity.where(user_id: self.friends.ids << self.id).includes(:user, :mentionable).order(created_at: :desc).limit(num)
  end


end
