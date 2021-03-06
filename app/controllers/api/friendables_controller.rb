class Api::FriendablesController < ApplicationController

  def create  # sending a friend request
    return if current_user.id == params[:user_id]
    @friendable = current_user.friendables.new(friend_id: params[:user_id])

    if @friendable.save
      render json: @friendable
    else
      render json: @friendable.errors.full_messages
    end
  end

  def update # accepting a friend request
    @friendable = Friendable.find_by(
      user_id: params[:id],
      friend_id: current_user.id
    )
    @friendable.accept
    current_user.activities.create(mentionable_id: @friendable.user_id, mentionable_type: 'User', message: 'became friends with')
    current_user.mentions.create(user_id: @friendable.user_id, message: 'is now friends with')
    render json: @friendable
  end

  def destroy # rejecting a friend request
    @friendable = Friendable.find_by(
      user_id: params[:id],
      friend_id: current_user.id
    )
    @friendable.remove
    render json: {}
  end
end
