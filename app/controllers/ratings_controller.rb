class RatingsController < ApplicationController

  def new
    @rating = Rating.new
    render :new
  end

  def create
    @rating = Rating.new(rating_params)
    @rating.film_id = params[:film_id]
    @rating.user_id = current_user.id

    if @rating.save
      redirect_to film_url(@rating.film.id)
    else
      flash.now[:errors] = @rating.errors.full_messages
      render :new
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:rating, :view_date, :review)
  end
end
