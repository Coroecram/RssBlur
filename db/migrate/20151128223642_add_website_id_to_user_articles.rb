class AddWebsiteIdToUserArticles < ActiveRecord::Migration
  def change
    add_column :user_articles, :website_id, :integer, null: false, default: 0
    remove_column :user_articles, :pseudo_read

    add_index :user_articles, :website_id
  end
end
