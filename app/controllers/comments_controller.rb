class CommentsController < ApplicationController
  
  def create
    @game = Game.find(params[:comment][:game_id])
    @comment = @game.comments.build(comments_params)
    @comment.user = current_user
    if @comment.save
      render "comments/show"
    else
      render :json => "Comment can't be blank.", :status => 422
    end
  end

  def comments_params
    params.require(:comment).permit(:body)
  end
end
