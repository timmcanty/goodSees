module Api
  class FilmsController < ApiController



    def show
      @film = Film.find(params[:id])
      @rating = Rating.find_by(user_id: current_user.id, film_id: params[:id]) if current_user
      render :show
    end

    def index
      if params[:search] && params[:search] != ''
        @films = Film.search_for_film(params[:search]).page(params[:page]).per(21)
      else
        @films = Film.all.page(params[:page]).per(21).includes(:ratings)
      end
      @ratings = current_user ? current_user.ratings : []
      render :index
    end

    def create
      @film = Film.new(film_params)
      if @film.save
        render :show
      else
        render json: @film.errors.full_messages, status: :unprocessable_entity
      end
    end

    def film_params
      params.require(:film).permit(:title, :description, :imdb_url, :image)
    end

  end
end
