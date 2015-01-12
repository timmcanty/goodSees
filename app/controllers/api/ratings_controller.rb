module Api
  class RatingsController < ApiController

    def update
      @rating = Rating.find(params[:id])

      if @rating.update(rating_params)
        render json: @rating
      else
        render json: @rating.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @rating = Rating.find(params[:id])
      render :show
    end

    def create
      @rating = current_user.ratings.new(rating_params)
      if @rating.save
        render json:   @rating
      else
        render json: @rating.errors.full_messages
      end
    end


    private


    def rating_params
      params.require(:rating).permit(:star_rating, :review,
        :view_date, :user_id, :film_id)
    end

  end
end
