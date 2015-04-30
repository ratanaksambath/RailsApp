class ChangeYiel < ActiveRecord::Migration
  def change
    rename_column :recipes, :block, :yield
  end
end
