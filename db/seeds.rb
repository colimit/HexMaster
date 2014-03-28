# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



ActiveRecord::Base.transaction do 
  user = User.create(
    username: "Nate Watson", 
    password: "password", 
    little_golem_name: "Bundle Gerbe",
    session_token: "something"
  )
  
  
  game = Game.fetch_from_little_golem(1612708)

  game.comments.build([{
  body: <<-Comment
Commenting: 1.g7 2.a1 3.e6 4.b2 is great for red! 2.swap is a better. Even 2.i10 is an improvement, though bad.

Variations included in the comments may be clicked on the board. To insert a variation in your comment, just type the move or moves (including the numbers) in your comment. Alternatively, you can cut and paste from another comment, or press "insert branch" to get the current variation on the board. Guests can comment and this page is periodically reset so go ahead and try it!
Comment
  },
  
  {
  body: <<-Comment
By default, moves are considered to be variations from the last variation considered. For instance,  1.b2   may be answered by 2.i10 . Alternatively, 2.e6  has been played by Maciej. If we want to consider a fresh branch directly from the game, type a pipe before your moves. For instance,  | 2.i5  is something Daniel could have played.  
Comment
  },
  
  {
  body: <<-Comment
1.m8  
This game is a game in the February 2014 LG championship. Your commenter is the author of Hex App, Nate Watson, a lowly 1780 rated player on LG.

Maciej Celuch is the top player on LG, and presumably, in the world.
Comment
  },
  
  {
  body: <<-Comment
2.swap  
Daniel Sepczuk is the number two player on LG, and like Maciej, he is from Poland. 

Swapping is a special move only available on blue's first move. Blue may "take" the first move of red by swapping, effectively acting as if it was their own opening move. This is known as the "pie rule," after the "you cut I choose" algorithm, which parents often encourage their children to use to divide goodies fairly. Without this rule, red would have a huge advantage due to having the first move, but this rule makes the game very fair.

1.m8  is fairly commonly swapped, and Daniel does so here.
Comment
  },
  
  {
  body: <<-Comment
3.e9 . 
The "short diagonal" consisting of squares like 3.a13  , 3.b12  , 3.c11  , 3.d10  etc. is of great strategic importance, since for instance if 3.e9 4.e10 5.d10 6.c12 7.d11 8.d12 9.e11  , red is two rows from the edge, whereas if 4.d11 5.f10  and red can get even closer. On the other hand if 3.d9 4.d10 5.e9  and red is four rows from the edge.
Comment
  },
  
  {
  body: <<-Comment
21.j8  
The pattern that is forming with 15.j5 16.i6 17.j6 18.i7 19.j7 20.i8 21.j8  is called a ladder. At some point, blue must play a move that stops the latter, or else red will reach the bottom. 22.g12  effectively blocks red to the left. The space on the right is too small for red to connect
Comment
  }
  ])
  
  game.comments.each {|comment| comment.user = user }
  
  
  game.save!
  
   # 
  # Game.save_player_file!("db/records/daniel_sepczuk.hsgf",["Daniel Sepczuk"])
  # Game.save_player_file!("db/records/maciej_celuch.hsgf",["Maciej Celuch"])
  # Game.save_player_file!("db/records/iLyN_Sin.hsgf",["iLyN Sin"])
  # Game.save_player_file!("db/records/arek_kulczycki.hsgf",["Arek Kulczycki"])
end
