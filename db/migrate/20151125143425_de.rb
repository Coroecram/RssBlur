class De < ActiveRecord::Migration
  def change
    remove_index :articles, :website_id
    add_index :articles, :website_id
  end
end
