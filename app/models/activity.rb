class Activity < ActiveRecord::Base
  belongs_to :user
  belongs_to :mentionable, polymorphic: true
end
