module Api
  class FilmsController < ApiController

    def index
      @films = Film.all.includes(:ratings)
      @ratings = current_user ? current_user.ratings : []
      render :index
    end

  end
end
