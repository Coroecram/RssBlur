class AddColumnsIsFeedAndLogoToWebsites < ActiveRecord::Migration
  def change
    add_column :websites, :logo, :string
    add_column :websites, :is_feed, :boolean, default: false
  end
end
