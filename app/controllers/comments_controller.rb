class CommentsController < ApplicationController
  
  def create
<<<<<<< HEAD
=======
    unless current_user
      render :json => "You are not authorized", :status => 403
      return
    end
>>>>>>> launch
    @game = Game.find(params[:comment][:game_id])
    @comment = @game.comments.build(comments_params)
    @comment.user = current_user
    if @comment.save
      render "comments/show"
    else
      render :json => "Comment can't be blank.", :status => 422
    end
  end
  
  def destroy
    @comment = Comment.find(params[:id])
    if @comment.user == current_user || current_user.moderator
      render :json => @comment.delete, :status => 200
    else
      render :json => "You are not authorized ", :status => 403
    end
  end
  
  def update
    @comment = Comment.find(params[:id])
    if @comment.user == current_user || current_user.moderator
      if @comment.update(update_params)
        render "comments/show"
      else
        render :json => "Comment can't be blank.", :status => 422
      end
    else
      render :json => "You are not authorized ", :status => 403
    end
  end
  
  
  private

  def comments_params
    params.require(:comment).permit(:body)
  end
  
  def update_params
    params.permit(:body)
  end
end
