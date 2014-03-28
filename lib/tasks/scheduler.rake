task :reset_db => :environment do
  `pg:reset HEROKU_POSTGRESQL_OLIVE_URL --confirm `
end