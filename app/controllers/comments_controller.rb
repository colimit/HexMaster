class CommentsController < ApplicationController
  
  def create
    @game = Game.find(params[:comment][:game_id])
    @comment = @game.comments.build(comments_params)
    @comment.user = current_user
    flash.now[:errors] unless @comment.save
    render "comments/show"
  end

  def comments_params
    params.require(:comment).permit(:body)
  end
end
