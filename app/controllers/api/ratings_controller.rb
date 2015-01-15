module Api
  class RatingsController < ApiController

    def update
      @rating = Rating.find(params[:id])

      if @rating.update(rating_params)
        current_user.activities.create(mentionable_id: @rating.film_id, mentionable_type: 'Film', message: 'reviewed') if @rating.review
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
        current_user.activities.create(mentionable_id: @rating.film_id, mentionable_type: 'Film', message: 'rated')
        current_user.activities.create(mentionable_id: @rating.film_id, mentionable_type: 'Film', message: 'reviewed') if @rating.review
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
