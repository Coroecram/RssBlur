class RemoveArticlesImageColumn < ActiveRecord::Migration
  def change
    remove_column :articles, :image, :text
  end
end
