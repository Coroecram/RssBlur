class AddLogoColorAndDescriptionToWebsites < ActiveRecord::Migration
  def change
    add_column :websites, :logo_color, :string
    add_column :websites, :description, :string
  end
end
