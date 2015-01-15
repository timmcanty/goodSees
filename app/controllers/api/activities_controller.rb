class Api::ActivitiesController < ApplicationController

  def index
    @activities = current_user.feed_activities(20)
    render :index
  end
end
