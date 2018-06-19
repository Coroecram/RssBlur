namespace :delete do
  desc 'Delete all Records older than 7 days'
  task :old_records => :environment do
    Article.delete_all('created_at < ?', 7.days.ago)
    UserArticle.delete_all('created_at < ?', 7.days.ago)
    UserWebsite.delete_all('created_at < ?', 7.days.ago)
    Folder.delete_all('created_at < ?', 7.days.ago)
  end
end
