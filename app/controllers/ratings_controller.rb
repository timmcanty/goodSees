class RatingsController < ApplicationController

  def new
    @rating = Rating.new
    render :new
  end

  def edit
    @rating = Rating.find(params[:id])
    render :edit
  end

  def update
    @rating = Rating.find(params[:id])

    if (params[:reels] &&
        params[:reels].keys.map(&:to_i).sort != current_user.reels.ids)
      current_user.update_reels_for_film(params[:reels].keys.map(&:to_i), @rating.film.id)
    end

    if @rating.update(rating_params)
      redirect_to film_url(@rating.film.id)
    else
      flash.now[:errors] = @rating.errors.full_messages
      render :edit
    end
  end

  def create
    @rating = current_user.ratings.new(rating_params)
    @rating.film_id = params[:film_id]
    if params[:reels]
      current_user.update_reels_for_film(params[:reels].keys.map(&:to_i), @rating.film.id)
    end

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
