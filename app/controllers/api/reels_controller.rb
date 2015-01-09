module Api
  class ReelsController < ApiController

    def create
      @reel = current_user.reels.new(reel_params)

      if @reel.save
        render json: @reel
      else
        render json: @reel.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @reel = Reel.find(params[:id])
      if params[:command] == 'add'
        @reel.add_film(params[:film_id])
      else
        @reel.remove_film(params[:film_id])
      end
      render json: @reel
    end


    private


    def reel_params
      params.require(:reel).permit(:name, :custom)
    end

  end
end
