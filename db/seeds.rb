# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Film.create(title: 'Guardians of the Galaxy',
  imdb_url: 'http://www.imdb.com/title/tt2015381/',
  description: 'A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.'
)

Film.create(title: 'The Muppets',
  imdb_url: 'http://www.imdb.com/title/tt1204342/',
  description: 'A Muppet fanatic with some help from his two human compatriots must regroup the Muppet gang to stop a avaricious oil mogul from taking down one of their precious life-longing treasures.'
)

Film.create(title: 'Airplane!',
  imdb_url: 'http://www.imdb.com/title/tt0080339',
  description: 'An airplane crew takes ill. Surely the only person capable of landing the plane is an ex-pilot afraid to fly. But don\'t call him Shirley.'
)

Film.create(title: 'The Godfather',
  imdb_url: 'http://www.imdb.com/title/tt0068646',
  description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
)


Film.create(title: 'The Good, the Bad and the Ugly',
  imdb_url: 'http://www.imdb.com/title/tt0060196',
  description: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.'
)
