# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Film.create(title: 'Guardians of the Galaxy',
  imdb_url: 'http://www.imdb.com/title/tt2015381/',
  description: 'A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking
    control of the universe.',
  image: 'http://ia.media-imdb.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg'
)

Film.create(title: 'The Muppets',
  imdb_url: 'http://www.imdb.com/title/tt1204342/',
  description: 'A Muppet fanatic with some help from his two human
    compatriots must regroup the Muppet gang to stop a avaricious oil mogul from
    taking down one of their precious life-longing treasures.',
  image: 'http://ia.media-imdb.com/images/M/MV5BMjE0MTM4NTc3NF5BMl5BanBnXkFtZTcwMjYzOTIxNg@@._V1_SX300.jpg'
)

Film.create(title: 'Airplane!',
  imdb_url: 'http://www.imdb.com/title/tt0080339',
  description: 'An airplane crew takes ill. Surely the only person
  capable of landing the plane is an ex-pilot afraid to fly. But don\'t call him Shirley.',
  image: 'http://ia.media-imdb.com/images/M/MV5BNDU2MjE4MTcwNl5BMl5BanBnXkFtZTgwNDExOTMxMDE@._V1_SX300.jpg'
)

Film.create(title: 'The Godfather',
  imdb_url: 'http://www.imdb.com/title/tt0068646',
  description: 'The aging patriarch of an organized crime dynasty transfers
    control of his clandestine empire to his reluctant son.',
  image: 'http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_SX300.jpg'
)


Film.create(title: 'The Good, the Bad and the Ugly',
  imdb_url: 'http://www.imdb.com/title/tt0060196',
  description: 'A bounty hunting scam joins two men in an uneasy alliance
    against a third in a race to find a fortune in gold
    buried in a remote cemetery.',
  image: 'http://ia.media-imdb.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SX300.jpg'
)

User.create(
  username: 'Dusty',
  name: 'Dusty',
  location: Faker::Address.city + ', ' + Faker::Address.state,
  bio: Faker::Lorem.paragraph(3),
  password: SecureRandom.urlsafe_base64(16),
  email: 'dusty@email.com',
  image: 'http://weather.climatechangecommunication.org/images/avatar-male.png'
)

User.create(
  username: 'Camren',
  name: 'Camren',
  location: Faker::Address.city + ', ' + Faker::Address.state,
  bio: Faker::Lorem.paragraph(3),
  password: SecureRandom.urlsafe_base64(16),
  email: 'camren@email.com',
  image: 'https://lh4.googleusercontent.com/-XtZnZwJUWMk/AAAAAAAAAAI/AAAAAAAAABI/RbZOBUySnB8/photo.jpg'

)

User.create(
  username: 'Kallie',
  name: 'Kallie',
  location: Faker::Address.city + ', ' + Faker::Address.state,
  bio: Faker::Lorem.paragraph(3),
  password: SecureRandom.urlsafe_base64(16),
  email: 'kallie@email.com',
  image: 'https://lh4.googleusercontent.com/-XtZnZwJUWMk/AAAAAAAAAAI/AAAAAAAAABI/RbZOBUySnB8/photo.jpg'
)

User.create(
  username: 'Torrey',
  name: 'Torrey',
  location: Faker::Address.city + ', ' + Faker::Address.state,
  bio: Faker::Lorem.paragraph(3),
  password: SecureRandom.urlsafe_base64(16),
  email: 'torrey@email.com',
  image: 'https://lh4.googleusercontent.com/-XtZnZwJUWMk/AAAAAAAAAAI/AAAAAAAAABI/RbZOBUySnB8/photo.jpg'
)
