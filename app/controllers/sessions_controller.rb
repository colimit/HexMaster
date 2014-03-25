class SessionsController < ApplicationController
  
  def create
     user = User.find_by_credentials(
       params[:username],
       params[:password]
     )

     if user.nil?
       render :json => "Incorrect username or password"
     else
       self.current_user = user
       puts user.to_json
       render :json => user
     end
   end

   def destroy
     logout_current_user!
     render :json => nil
   end
end
