namespace :delete do
  desc 'Delete all Records older than 7 days'
  task :old_records => :environment do
    Article.where('created_at < ?', 7.days.ago).destroy_all
    UserArticle.where('created_at < ?', 7.days.ago).destroy_all
    UserWebsite.where('created_at < ?', 7.days.ago).destroy_all
    Folder.where('created_at < ?', 7.days.ago).destroy_all
  end
end
