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
        render json: @reel
      elsif params[:command] == 'remove'
        @reel.remove_film(params[:film_id])
        render json: @reel
      else
        if @reel.name == 'Watched'
          reel_to_remove_from = Reel.find_by( user_id: current_user.id, name: 'To Watch')
        else
          reel_to_remove_from = Reel.find_by( user_id: current_user.id, name: 'Watched')
        end
        @reel.add_film(params[:film_id])
        reel_to_remove_from.remove_film(params[:film_id])
        render json: [@reel,reel_to_remove_from]
      end

    end


    private


    def reel_params
      params.require(:reel).permit(:name, :custom)
    end

  end
end
