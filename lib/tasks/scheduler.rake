task :update_feed => :environment do
  `rake pg:reset HEROKU_POSTGRESQL_OLIVE_URL --confirm hex-master-demo`
end