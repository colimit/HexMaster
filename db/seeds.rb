# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



ActiveRecord::Base.transaction do
  GameRecord.save_player_file!("db/records/daniel_sepczuk.hsgf",["Daniel Sepczuk"])
  GameRecord.save_player_file!("db/records/maciej_celuch.hsgf",["Maciej Celuch"])
  GameRecord.save_player_file!("db/records/iLyN_Sin.hsgf",["iLyN Sin"])
  GameRecord.save_player_file!("db/records/arek_kulczycki.hsgf",["Arek Kulczycki"])
end
