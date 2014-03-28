task :reset_db => :environment do
  `heroku pg:reset HEROKU_POSTGRESQL_OLIVE_URL --confirm hex-master-demo`
end