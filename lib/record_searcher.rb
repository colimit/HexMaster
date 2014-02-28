class RecordSearcher
  
  
  
  
  def self.next_moves_data(digest)
    is_master_function = <<-SQL
    CASE 
      WHEN gp1.turn_color='red'
      THEN games.red_master
      ELSE games.blue_master
      END
    SQL
    
    next_positions_query = <<-SQL
    SELECT 
      gp2.last_move, 
      COUNT(CASE WHEN (#{is_master_function}) THEN 1 ELSE null END) as master,
      COUNT(gp2.id) as all
    FROM
      game_positions gp1 
    JOIN 
      games
    ON
      gp1.game_id = games.id 
    JOIN
      game_positions gp2
    ON
      games.id = gp2.game_id 
    WHERE
      gp1.position_id = (SELECT id
                         FROM positions
                         WHERE position_digest = ?)
    AND
      (gp1.last_move_number + 1) = gp2.last_move_number
    GROUP BY
      gp2.last_move
    ORDER BY
      master DESC
    SQL
    results  = { :master => Hash.new(0), :all => Hash.new(0) }
    GamePosition.find_by_sql([next_positions_query, digest]).each do |move|
      results[:master][move.last_move] += move.master if move.master > 0
      results[:all][move.last_move] += move.all if move.all > 0
    end
    results
  end
  
end
