task :reset_db => :environment do
  `pg:reset HEROKU_POSTGRESQL_OLIVE_URL --confirm hex-master-demo`
end