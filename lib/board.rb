require 'set'
require 'colorize'
require 'base64'

class Board
  attr_accessor :board, :turn_color, :size, :winner
  
  COLORS = [:empty, :red, :blue]
  ADJACENCY = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1]]
  PIECE_STRINGS = { 
                    :empty => "\u25CB".encode("UTF-8"),
                    :red =>  "R", #"\u25CF".encode("UTF-8").colorize(:red),
                    :blue => "B" #"\u25CF".encode("UTF-8").colorize(:blue)
                  }
  
  def initialize(size = 13, board = nil, turn_color = :red, winner = nil)
    @size       = size 
    @board      = board || Array.new(size) { Array.new(size) { 0 } }
    @turn_color = turn_color
    @winner     = winner
  end
  
  #Raised for illegal operations to out-of-bounds coordinates
  class OutOfBoundsError < RuntimeError
  end
  
  class IllegalColorError < RuntimeError
  end
  
  class IllegalMoveError < RuntimeError
  end
  
  class MalformedCoordError <RuntimeError
  end

  def self.opposite_color(color)
    case color
    when :red
      :blue
    when :blue
      :red
    when :empty
      :empty
    end
  end
  
  #returns :red, :blue, :empty, or nil
  def [](coord)
    row, col = self.class.to_coord(coord)
    #Ensure nil is always returned out of bounds, even for negative numbers.
    return nil unless row.between?(0, @size - 1) && col.between?(0, @size - 1)
    COLORS[@board[row][col]]
  end
  
  #Sets a square to a color. Out of bounds raises an error, but setting an
  #occupied square is permitted
  def []=(coord, color)
    row, col = self.class.to_coord(coord)
    raise OutOfBoundsError, "Coordinate must be in board" if self[coord].nil? 
    color_index = COLORS.index(color)
    raise IllegalColorError, "Illegal color" unless color_index
    @board[row][col] = color_index
  end
  
  #determines if color has won. Preforms a depth first search for a path from
  #the start row/column to the target row/column.
  def has_won?(color)
    stack   = start_hexes(color)
    visited = Set.new(stack)
    until stack.empty?
      current = stack.pop
      children = neighbors(current).reject { |coord| visited.include?(coord) }
      return true if children.any? { |coord| is_target?(coord) }
      visited.merge(children)
      stack.concat(children)
    end
    false
  end
 
  def to_s
    (0...@size).map do |row|
      " " * row +
      (0...@size).map do |col|
        PIECE_STRINGS[self[[row,col]]]
      end
      .join(" ")
    end
    .join("\n")
  end
  
  def to_html
    to_s.gsub("\n","<br>").gsub(" ", "&nbsp&nbsp")
  end
  
  def ==(other)
    self.board == other.board && self.turn_color == other.turn_color
  end
  
  
  def handle_move(move)
    if move == "swap"
      raise IllegalMoveError, "Cannot swap" unless swappable?
      swap
      pass_turn
    elsif move == "resign"
      resign
    else
      raise IllegalMoveError, "Illegal move" unless self[move] == :empty
      self[move] = self.turn_color
      pass_turn
    end
    self
  end
  
  def next_moves_data
    RecordSearcher.next_moves_data(position_digest)
  end
  
  #finds next moves data, taking into account the symmetries involved.
  def symmetric_next_moves_data
    start_digest = position_digest
    results = next_moves_data
    flip
    add_results!(results, normalize_results(next_moves_data, :flip))
    #in symmetrical positions, symmetrical moves will be counted double
    #so we must remove them
    fix_doubled_moves!(results) if position_digest == start_digest 
    if multiple_pieces?
      swap
      pass_turn
      add_results!(results, normalize_results(next_moves_data, :flipswap))
      flip
      add_results!(results, normalize_results(next_moves_data, :swap))
      swap
      pass_turn
    else
      flip
    end
    results
  end
  
  def self.advise(hsgf_string)
    self.position(hsgf_string).symmetric_next_moves_data
  end
  
  #convert coord to a pair [row, col] from other formats. out of bounds
  #is allowed but other coordinates raise an error
  def self.to_coord(coord)
    if coord.is_a?(String) && coord.length == 2
      [coord[1].ord - 'a'.ord, coord[0].ord - 'a'.ord]
    elsif coord.is_a?(Array) && coord.length == 2
      coord
    else
      raise MalformedCoordError, "Malformed Coordinate"
    end
  end
  
  def self.to_move(coord)
    if coord.is_a?(String) && coord.length == 2
      coord
    elsif coord.is_a?(Array) && coord.length == 2
      "#{(coord[1] + 'a'.ord).chr}#{(coord[1] + 'a'.ord).chr}"
    else
      raise MalformedCoordError, "Malformed Coordinate"
    end
  end
  
  #returns a unique string for each position. Used to look up games
  #in which a certain position occurs. 
  def position_digest
    hex_digest = @board.flatten.map(&:to_s).join.to_i(3).to_s(16)
    "#{hex_to_base64_digest(hex_digest)};#{size};#{turn_color}"
  end

  private
  
    def add_results!(results, other)
      other.each do |type, counts|
        counts.each do |move, count|
          results[type][move] += count
        end
      end
      results
    end
  
    def normalize_results(results, symmetry)
      operation = "#{symmetry}_move"
      normalized_results = Hash.new
      results.each_key do |type|
        normalized_results[type] = Hash.new(0)
        results[type].each do |move, count|
          normalized_results[type][self.send(operation, move)] += count
        end
      end 
      normalized_results  
    end
    
    def fix_doubled_moves!(results)
      diagonal_moves = (0...size).map do |index|
        self.class.to_move([index,index])
      end
      symmetric_moves = diagonal_moves + ["swap", "resign"]
      results.each_key do |key|
        symmetric_moves.each do |move|
          results[key][move] /= 2 if results[key][move] > 0
        end
      end
    end
    
    def flip_letter(char)
      new_index = (size - 1) - (char.ord - 'a'.ord)
      raise MalformedCoordError unless (new_index >= 0) && (new_index < size)
      new_ord = 'a'.ord + new_index
      new_ord.chr
    end
    
    def flip_move(move)
      return move if ["swap","resign"].include?(move)
      "#{flip_letter(move[0])}#{flip_letter(move[1])}" 
    end
    
    def swap_move(move)
      return move if ["swap","resign"].include?(move)
      "#{move[1]}#{move[0]}"
    end
    
    def flipswap_move(move)
      flip_move(swap_move(move))
    end
    
    def flip
      indices = (0...@size).to_a
      #iterates through all squares on or above the long diagonal, 
      #e.g. [0,1] or [1, 1] but not [1, 0]
      indices.repeated_combination(2).each do |row, col|
        color = self[[row, col]]
        flip_row, flip_col = @size - 1 - row, @size - 1 - col
        mirror_color = self[[flip_row, flip_col]]
        self[[flip_row, flip_col]] = color
        self[[row, col]] = mirror_color
      end
    end
  
    def swap
      indices = (0...@size).to_a
      #iterates through all squares on or above the long diagonal, 
      #e.g. [0,1] or [1, 1] but not [1, 0]
      indices.repeated_combination(2).each do |row, col|
        color = self[[row, col]]
        mirror_color = self[[col, row]]
        self[[col, row]] = self.class.opposite_color(color)
        self[[row, col]] = self.class.opposite_color(mirror_color)
      end
    end
  
    def resign
      @winner = self.class.opposite_color(self.turn_color)
    end
  
    def set_winner
      @winner = :red  if has_won?(:red)
      @winner = :blue if has_won?(:blue)
    end


    def hex_to_base64_digest(hex_digest)
      [[hex_digest].pack("H*")].pack("m0")
    end

    def all_coords
      indices = (0...@size).to_a
      indices.product(indices)
    end
  
    def swappable?
      (1 == all_coords.count { |coord| self[coord] != :empty }) &&
        (turn_color == :blue)
    end
    
    #determines if swap symmetry should be considered for a board
    def multiple_pieces?
      1 < all_coords.count { |coord| self[coord] != :empty }
    end
    
    #Finds all neighbors of a coord with the same color as that is at that coord
    def neighbors(coord)
      color = self[coord]
      ADJACENCY
        .map { |direction| coord.add_elements(direction) }
        .select { |new_coord| self[new_coord] == color }
    end
  
    #determines if a coord is occupied by a piece on its target row.
    def is_target?(coord)
      return false if self[coord] == :empty || self[coord].nil?
      self[coord] == :red ? coord[0] == @size - 1 : coord[1] == @size - 1
    end

    #returns an array of coordinates of hexes of a color which are on the
    #starting row
    def start_hexes(color)
      squares = []
      @size.times do |index|
        if color == :red
          squares << [0, index] if self[[0, index]] == :red
        else
          squares << [index, 0] if self[[index, 0]] == :blue  
        end      
      end
      squares
    end
    
    def self.position(hsgf_string)
      record = GameRecord.read_hsgf(hsgf_string)
      record.position
    end
    
    def pass_turn
      self.turn_color = self.class.opposite_color(turn_color)  
    end
end


class Array
  
  #Add elements of self with cooresponding elements of other.
  def add_elements(other)
    self.zip(other).map { |elems| elems.reduce(0, :+)}
  end
  
end

