#HexMaster

An app for viewing and commenting games of Hex, an abstract board game [wiki](http://en.wikipedia.org/wiki/Hex_(board_game))
The rules are simple: players take turns placing pieces on a parallelogram board, trying to connect the two sides of their color.

### Features
The game viewing page is has a clickable board, which updates a move table that holds the moves of the game being viewed, as well as the moves of the variation or "branch" from the game which is currently being considered. A typical comment entered like so 

"If red 5.e6 then 6.f7 7.g8. Alternatively 7.g9 8.f10 is viable as well."

These moves are parsed into clickable DOM elements in real time, and may be clicked to show the position being referred to on the board. Additionally, the branch currently viewed in the board may be trasferred to the comment form. A series of radio buttons also aids in navigation. User authentication for commenting is also implemented.


### Implementation
This is a backbone app, consuming a restful rails JSON api which is implemented with Jbuilder templates. A skeleton of a parser-combinator library, interpreter.js is included in the lib directory, and is used to tokenize and parse the user input as it is being input, so that the user can preview the comment in real time.

The games records the app uses are provided from the turn-based game server [Little Golem](http://www.littlegolem.net), from which they are parsed server-side.


#### [Demo](hex-master-demo.herokuapp.com)
#### [Live](hexmaster.net)


##### Thanks

Thanks to LG player urmaul, who provided an improved version of the board image that is used by the app, as well as feedback on the layout.
