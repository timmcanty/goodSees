module Api
  class FilmsController < ApiController

    def index
      @films = Film.all.includes(:ratings)
      @ratings = current_user ? current_user.ratings : []
      render :index
    end

    def create
      @film = Film.new(film_params)
      if @film.save
        render json: @film
      else
        render json: @film.errors.full_messages, status: :unprocessable_entity
      end
    end

    def film_params
      params.require(:film).permit(:title, :description, :imdb_url, :image)
    end

  end
end
