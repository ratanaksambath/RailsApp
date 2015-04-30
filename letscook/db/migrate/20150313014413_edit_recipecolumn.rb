class EditRecipecolumn < ActiveRecord::Migration
  def change
    rename_column :recipes, :img_url, :imageURL
    rename_column :recipes, :descrtiption, :description
    rename_column :recipes, :region, :cuisine
    rename_column :recipes, :ingredient, :ingredients
    rename_column :recipes, :instruction, :instructions
  end
end
