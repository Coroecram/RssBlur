class RenameUserWebsitesToUserWebsiteFolders < ActiveRecord::Migration
  def change
    add_column(:folders, :user_website_id, :integer)
    add_column(:folders, :root, :boolean, default: false)
    add_column(:folders, :created_at, :datetime)
    add_column(:folders, :updated_at, :datetime)
    add_column(:user_articles, :created_at, :datetime)
    add_column(:user_articles, :updated_at, :datetime)

    add_index :folders, :user_website_id
    add_index :folders, :root
  end
end
