class RemoveIsFeedFromWebsites < ActiveRecord::Migration
  def change
    remove_column :websites, :is_feed
  end
end
