task :reset_db => :environment do
  `rake pg:reset HEROKU_POSTGRESQL_OLIVE_URL`
end