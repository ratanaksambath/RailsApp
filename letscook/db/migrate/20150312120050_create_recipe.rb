class CreateRecipe < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
    t.string   :title
    t.text     :descrtiption
    t.string   :region
    t.text     :ingredient
    t.text     :instruction
    t.text     :block
    t.integer  :time
    t.text     :img_url
    t.references :user
    t.timestamps
    end
  end
end
