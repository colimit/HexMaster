class CommentsController < ApplicationController
  
  def create
    @comment = Comment.new(comments_params)
    @move = Move.find(params[:comment][:move_id])
    unless @comment.save
      flash.now[:errors]
    end
    redirect_to move_url(@move)
  end


  def comments_params
    params.require(:comment).permit(:move_id,:body)
  end
end
