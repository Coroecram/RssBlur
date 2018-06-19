namespace :guest_prep do
  desc 'Retrieve guest websites'
  task :guest_updates => :environment do
    ArticleParser.new(-1, 10, 'http://feeds.feedburner.com/colossal')
    ArticleParser.new(-1, 13, 'https://gizmodo.com/rss')
  end
end
