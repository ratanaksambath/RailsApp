class CreateUser < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password
      t.string :logged_in_user

      t.timestamps
  end
  add_index :users, :email, unique: :true
  add_index :users, :logged_in_user
  end
end
