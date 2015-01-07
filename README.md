# goodSees
GoodReads clone with movies instead!

Implemented:
- Users can sign up/ log in / sign out
- Users can create custom reels

MVP Features:
- Users can search for other Users
- Users can send/accept friend requests
- Admins can add new films to the DB
- Users can rate films with a:
  - 1/5 Star Rating
  - Watch Date
  - Review
- Users have 'to watch' and 'watched' reels
- Users can assign a film to multiple reels
- Users can put unwatched films in a 'to watch' reel
- Users can search the site for films
- Users can see a list/display of all films
- Users can see the overall ratings for a film.
- Users can create and edit a profile
- Users can feature a single reel on their profile
- Users can view each others ratings and profiles

Schema:

Users:
:username
:pw_digest
:email
:name
:location
:birthdate
:img
:bio

Session Token:
:token
:user_id

UserFriends:
:user_id
:friend_id

Films
:title
:img
:imdb_url
:description

Shelves
:user_id
:name
:featured
:custom

Ratings:
:user_id
:film_id
:rating
:view_date
:review


TODOS:
- Change Users :birth_date column to type date, not type date-time
