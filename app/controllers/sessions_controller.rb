class SessionsController < ApplicationController
  
  def create
     user = User.find_by_credentials(
       params[:user][:username],
       params[:user][:password]
     )

     if user.nil?
       render :json => "Credentials were wrong"
     else
       self.current_user = user
       render :json => user
     end
   end

   def destroy
     logout_current_user!
     render :json => "Logged out"
   end
end
