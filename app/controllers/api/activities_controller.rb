class Api::ActivitiesController < ApplicationController

  def index
    return if !logged_in?
    @activities = current_user.feed_activities(20)
    Activity.mark_as_read! :all, :for => current_user
    render :index
  end
end
