class UsersController < ApplicationController
  
  
  def create
    @user = User.new(user_params)
    @user.ensure_session_token
    if @user.save
      current_user = @user
      render :json => @user
    else
      render :json => @user.errors.full_messages.first 
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :password, :email, :little_golem_name)
  end

end
