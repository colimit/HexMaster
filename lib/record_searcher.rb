class RecordSearcher
  
  def games(digest)
    Game.includes(:moves)
  end
  
  
  
  def self.next_moves_data(digest)
    is_master_function = <<-SQL
    CASE WHEN
      (CASE 
      WHEN gp1.turn_color='red'
      THEN games.red_master
      ELSE games.blue_master
      END)
    THEN 1
    ELSE 0
    END
    SQL
    
    won_function = <<-SQL
      CASE WHEN 
        gp1.turn_color = games.result
      THEN 1
      ELSE 0
      END  
    SQL
    
    next_positions_query = <<-SQL
    SELECT 
      gp2.move, 
      SUM(#{is_master_function}) as master,
      SUM(#{won_function}) as wins,
      COUNT(gp2.id) as all
      
    FROM
      moves gp1 
    JOIN 
      games
    ON
      gp1.game_id = games.id 
    JOIN
      moves gp2
    ON
      games.id = gp2.game_id 
    WHERE
      gp1.position_digest = ?
    AND
      (gp1.move_number + 1) = gp2.move_number
    GROUP BY
      gp2.move
    ORDER BY
      master DESC
    SQL
    results  = { :master => Hash.new(0), 
                 :all => Hash.new(0), 
                 :wins => Hash.new(0) }
    Move.find_by_sql([next_positions_query, digest]).each do |move|
      results[:master][move.move] += move.master if move.master > 0
      results[:all][move.move] += move.all if move.all > 0
      results[:wins][move.move] += move.wins if move.wins > 0
    end
    results
  end
  
end
