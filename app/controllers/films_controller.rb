class FilmsController < ApplicationController


  def show
    @film = Film.find(params[:id])
    @rating = Rating.find_by(user_id: current_user.id, film_id: params[:id])
    render :show
  end

  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      @films = User.find(params[:user_id]).films
    else
      @films = Film.all
    end

    render :index
  end

  def new
    if current_user.is_admin?
      @film = Film.new
      render :new
    else
      redirect_to films_url
    end
  end

  def create
    if current_user.is_admin?
      @film = Film.new(film_params)
      if @film.save
        redirect_to film_url(@film.id)
      else
        flash.now[:errors] = @film.errors.full_messages
        render :new
      end
    else
      redirect_to films_Url
    end
  end

  def edit
    if current_user.is_admin?
      fail
      @film = Film.find(params[:id])
      render :edit
    else
      redirect_to films_url
    end
  end

  def update
    @film = Film.find(params[:id])
    if current_user.is_admin?
      if @film.update(film_params)
        redirect_to film_url(@film.id)
      else
        flash.now[:errors] = @film.errors.full_messages
        render :edit
      end
    else
      redirect_to film_url(@film)
    end
  end

  def destroy
    if current_user.is_admin?
      @film = Film.find(params[:id])
      @film.destroy
    end
      redirect_to films_url
  end

  def film_params
    params.require(:film).permit(:imdb_url, :title, :description)
  end
end
