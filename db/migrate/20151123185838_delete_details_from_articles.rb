class DeleteDetailsFromArticles < ActiveRecord::Migration
  def change
    remove_column :articles, :details, :string
    add_column :articles, :image, :text
  end
end
