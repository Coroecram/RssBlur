class ChangeWebsitesStringColumnsToText < ActiveRecord::Migration
  def change
    change_column :websites, :logo, :text
    remove_column :websites, :logo_color
    change_column :websites, :description, :text
  end
end
